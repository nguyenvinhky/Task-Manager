package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.model.Todo;

import java.util.List;

public interface TodoService {
    public Todo AddTodo(Todo Todo);
    public List<Todo> getAllTodo();
    public boolean DeleteTodo(int Id);
    public boolean UpdateTodo(int Id, Todo updatedTodo);
}
