import { Component } from '@angular/core';
import { TasksService } from '../../Services/taskService.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskTitle: string = '';
  taskDescription: string = '';

  constructor(private taskService: TasksService, private router: Router) {}

  addTask() {
    
    if (this.taskTitle.trim() !== '' && this.taskDescription.trim() !== '') {
      this.taskService.AddTask(this.taskTitle, this.taskDescription);
      Swal.fire({
        icon: "success",
        title: "Done!",
        text: "Your task is added successfully",
      });
      this.router.navigate(['/']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter both title and description!',
      });
    }
  }
}
