import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  @Output() newAssignment = new EventEmitter<Assignment>();

  nameAssignment = '';
  dateAssignment = new Date();

  addActive = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.addActive = true), 2000);
  }

  onSubmit() {
    const assignment: Assignment = {
      id: Math.floor(Math.random() * 10000),
      name: this.nameAssignment,
      date: this.dateAssignment,
    };

    this.assignmentsService.addAssignment(assignment).subscribe((message) => {
      this.router.navigate(['/home']);
    });
  }
}
