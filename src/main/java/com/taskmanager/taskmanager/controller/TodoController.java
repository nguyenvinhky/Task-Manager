package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.model.Todo;
import com.taskmanager.taskmanager.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoController {
    @Autowired
    private TodoService todoService;

    @PostMapping("/add")
    public String Add(@RequestBody Todo todo){
        todoService.AddTodo(todo);
        return "Add Todo successfully";
    }

    @GetMapping("/getAllTodo")
    public List<Todo> getAllTodo(){
        return todoService.getAllTodo();
    }

    @DeleteMapping("/deleteTodo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable int id) {
        try {
            boolean isDeleted = todoService.DeleteTodo(id);
            if (isDeleted) {
                return ResponseEntity.ok("Todo deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting todo");
        }
    }

    @PutMapping("/updateTodo/{Id}")
    public ResponseEntity<String> UpdateTodo(@PathVariable int Id, @RequestBody Todo todo) {
        try {
            boolean isDeleted = todoService.UpdateTodo(Id, todo);
            if (isDeleted) {
                return ResponseEntity.ok("Todo update successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting todo");
        }
    }
}
