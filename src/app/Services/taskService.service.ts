import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Task } from '../Interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  TaskList:Task[]=[] ;


  constructor() {
    const savedTasks = localStorage.getItem("TasksListKey");

    if (savedTasks !== null) {
      this.TaskList = JSON.parse(savedTasks);
    } else {
      this.TaskList = [];
      this.storeTasks();
    }
  }

  DeleteTask(index:any){
    this.TaskList.splice(index,1);
    this.storeTasks();
  }


  AddTask(Title:string,Description:string){
    this.TaskList.push({
      title:Title,
      description:Description
    });
    this.storeTasks();
  }

  UpdateTask(taskIndex:any,taskObject:any){

    this.TaskList[taskIndex]= taskObject;
    this.storeTasks();
  }

  DeleteAllTasks(){
    localStorage.removeItem("TasksListKey");
    this.TaskList=[];
  }

  storeTasks(){
    localStorage.setItem("TasksListKey", JSON.stringify(this.TaskList) )
  }




}
