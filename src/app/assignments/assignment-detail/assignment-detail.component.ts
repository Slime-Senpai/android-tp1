import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';

import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignment: Assignment | undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  now = Date.now;

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = parseInt(this.route.snapshot.params['id']);

    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => (this.assignment = assignment));
  }

  onDelete() {
    if (!this.assignment) return;
    this.assignmentsService
      .deleteAssignment(this.assignment)
      .subscribe((message) => this.router.navigate(['/home']));
  }
}
