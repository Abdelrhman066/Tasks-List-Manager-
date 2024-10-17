import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TasksService } from '../../Services/taskService.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent implements OnInit {
  taskIndex: any;
  taskObject: any;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.title.setTitle("Update Task");
  }

  ngOnInit(): void {
    this.taskIndex = this.route.snapshot.paramMap.get('index');
    this.taskObject = { ...this.taskService.TaskList[this.taskIndex] };
  }

  updateTask() {
    if (this.taskObject.title.trim() !== '' && this.taskObject.description.trim() !== '') {
      this.taskService.UpdateTask(this.taskIndex, this.taskObject);
      Swal.fire({
        icon: "success",
        title: "Done!",
        text: "Your task is updated successfully",
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
