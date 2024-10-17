import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TasksService } from '../../Services/taskService.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public tasksService:TasksService, private title:Title,private router:Router ){
    this.title.setTitle("Tasks List");
    this.completedTasks = new Array(this.tasksService.TaskList.length).fill(false);
  }

  completedTasks: boolean[] = [];

  deleteTask(i:number){
    this.tasksService.DeleteTask(i);
    this.completedTasks.splice(i, 1);
  }

  deleteAllTasks(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-1",
        cancelButton: "btn btn-danger mx-1"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel ",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.tasksService.DeleteAllTasks();     /* --------------------------  */
        this.router.navigate(['/'])             /* --------------------------  */

        swalWithBootstrapButtons.fire({
          title: "Deleted",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your tasks are safe :)",
          icon: "error"
        });
      }
    });

  }

}
