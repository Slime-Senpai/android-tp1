import { Component, OnInit } from '@angular/core';

import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  title = 'Liste des devoirs';

  addAssignmentButtonText = 'Ajouter un devoir';

  selectedAssignment: Assignment | undefined;

  now = Date.now;

  formVisible = false;

  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentsService
      .getAssignments()
      .subscribe((assignments) => (this.assignments = assignments));
  }

  selectAssignment(assignment: Assignment) {
    this.selectedAssignment = assignment;
  }

  changeButtonText() {
    if (this.formVisible) {
      this.addAssignmentButtonText = 'Revenir à la liste';
    } else {
      this.addAssignmentButtonText = 'Ajouter un devoir';
    }
  }

  onNewAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    this.assignments.sort(
      (a: Assignment, b: Assignment) => a.date.getTime() - b.date.getTime()
    );

    this.assignmentsService.addAssignment(assignment).subscribe((message) => {
      this.formVisible = false;
      this.changeButtonText();
    });
  }

  onAddAssignmentBtnClick() {
    this.formVisible = !this.formVisible;
    this.changeButtonText();
  }

  onDeleteAssignment() {
    if (!this.selectedAssignment) return;

    this.assignmentsService
      .deleteAssignment(this.selectedAssignment)
      .subscribe((message) => {
        this.selectedAssignment = undefined;
      });
  }
}
