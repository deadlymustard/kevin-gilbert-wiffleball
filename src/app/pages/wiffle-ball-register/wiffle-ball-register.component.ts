import { ColorService } from './../../services/color.service';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { PaymentUtils } from './../../utils/payment-utils';
import { ItemizedPayment } from './../../interfaces/itemized-payment';
import { ConfigurationService } from './../../services/configuration.service';

import { AfterViewInit, Component, OnInit, Query } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Member, ShirtSize } from 'src/app/models/member.model';
import { League, Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { TeamValidator } from 'src/app/validators/team.validator';
import { ConfigurationData } from 'src/app/interfaces/wiffle-ball-register-page';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { map, mergeMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-wiffle-ball-register',
  templateUrl: './wiffle-ball-register.component.html',
  styleUrls: ['./wiffle-ball-register.component.scss']
})
export class WiffleBallRegisterComponent implements OnInit, AfterViewInit {

  config?: ConfigurationData;

  formType!: string;

  team: Team;
  captain: Member;
  members: Member[] = [];
  colors: String[] = [];

  minimumTeamMembers: number = 3;

  faTrashAlt = faTrashAlt;
  faStar = faStar;

  teamFormGroup!: FormGroup ;

  data = {
    description: `Registration for the 2019 Kevin Gilbert Wiffle Ball Tournament is now open.
    Registration is $100 per team. Registration includes a free t-shirt and a two-game guarantee.`,
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private teamService: TeamService,
    private teamValidator: TeamValidator,
    private firestore: AngularFirestore,
    private colorService: ColorService,
    public fb: FormBuilder,
    private title: Title,
    private meta: Meta
  ) {
    this.team = new Team();
    this.team.league = League.COMPETITIVE;
    this.captain = Object.assign(new Member(), {
        name: '',
        email: '',
        phone: '',
        shirtSize: ShirtSize.M,
        isCaptain: true
    } as Member);

  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.configurationService.configurationData.subscribe((config: ConfigurationData) => {
      this.config = config
      this.colorService.getColors().subscribe((colors: String[]) => {
        this.teamService.getTeams(config.registrationYear).subscribe((teams: Team[]) => {
          const remainingColors: String[] = colors.filter((color: String) => {
            return !teams.some((team: Team) => team.color === color)
          });
          this.colors = remainingColors;
        })
      })
    });

    this.title.setTitle('Kevin T. Gilbert Scholarship Fund | Wiffle Ball Register');
    this.meta.addTags([
      { name: 'og:url', content: '/wiffle-ball/register' },
      { name: 'og:title', content: 'Kevin T. Gilbert Scholarship Fund | Wiffle Ball Register' },
      { name: 'og:description', content: this.data.description }
    ]);

    this.teamFormGroup = this.fb.group({
      name: ['', Validators.required],
      shirtColor: 'Red',
      league: [League.COMPETITIVE, {updateOn: 'change'}],
      captain: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        shirtSize: ['M', Validators.required]
      }),
      members: this.constructMembersFormArray(3)
    }, {updateOn: 'blur'});

    this.teamFormGroup.get('league')?.valueChanges.subscribe(league => {
      if (league == League.COMPETITIVE) {
        this.teamFormGroup.setControl('members', this.constructMembersFormArray(3));
        this.minimumTeamMembers = 3;
      } else {
        this.teamFormGroup.setControl('members', this.constructMembersFormArray(4));
        this.minimumTeamMembers = 4;
      }
    });

    this.teamFormGroup.valueChanges.subscribe(() => {
      this.team = this.getFormValues();
    })
  }

  getFormValues(): Team {
    const teamValues: any = this.teamFormGroup.value;
    const team: Team = new Team();

    const captain: Member = Object.assign({isCaptain: true}, teamValues.captain) as Member;

    const members: Member[] = teamValues.members.map((memberValue: any) => {
      return Object.assign({isCaptain: false}, memberValue) as Member;
    });

    team.name = teamValues.name;
    team.color = teamValues.shirtColor;
    team.league = teamValues.league;
    team.members = [captain, ...members];
    team.paid = false;
    team.year = this.config?.registrationYear;

    const payment: ItemizedPayment = PaymentUtils.calculateTeamPayment(team);
    team.registrationFee = payment.netPrice;

    return team;
  }

  constructMembersFormArray(amount: number): FormArray {
    const membersFormArray = this.fb.array([]);
    for(let i = 0; i < amount; i++) {
      membersFormArray.insert(i, this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.email]],
        shirtSize: ['M', Validators.required]
      }));
    }
    return membersFormArray;
  }

  addBlankMember(): void {
    this.membersFormArray.push(this.fb.group({name: [''], email: [''], shirtSize: ['']}));
  }

  removeMember(index: number): void {
    this.membersFormArray.removeAt(index);
  }

  submitTeam(): void {
    this.teamService.createTeam(this.getFormValues()).subscribe((teamId: String) => {
      this.router.navigate([`/wiffle-ball/team/${teamId}`]);
    }, ((err: any) => {
      console.log(err);
    }));
  }

  get membersFormArray(): FormArray {
    return this.teamFormGroup.get('members') as FormArray;
  }

  get captainFormGroup(): FormGroup {
    return this.teamFormGroup.get('captain') as FormGroup;
  }

}
