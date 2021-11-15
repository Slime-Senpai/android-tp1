import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Assignment } from '../assignments/assignments.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id: 1,
      name: 'TP1 sur les WebComponents de Michel Buffa',
      date: new Date('2021-11-15'),
    },
    {
      id: 2,
      name: 'Projet Grails de Gregory Galli',
      date: new Date('2021-10-20'),
    },
    {
      id: 3,
      name: 'Projet Android de Amosse Edouard',
      date: new Date('2021-11-30'),
    },
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return of(this.assignments.find((a) => a.id === id));
  }
  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.assignments.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.loggingService.log(assignment.name, 'ajouté');

    return of('Assignment ajouté');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    this.loggingService.log(assignment.name, 'modifié');

    return of('Assignment modifié');
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.name, 'supprimé');

    return of('Assignment supprimé');
  }

  constructor(private loggingService: LoggingService) {}
}
