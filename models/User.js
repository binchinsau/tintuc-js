"use strict";

//tạo một Class User để đại diện cho thông tin của người dùng.
class User {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;

    this.pageSize = pageSize = 10;
    this.category = category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
