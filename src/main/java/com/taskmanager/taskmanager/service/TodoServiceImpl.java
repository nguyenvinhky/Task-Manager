package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.model.Todo;
import com.taskmanager.taskmanager.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService{
    @Autowired
    private TodoRepository todoRepository;

    @Override
    public Todo AddTodo(Todo Todo) {
        return todoRepository.save(Todo);
    }

    @Override
    public List<Todo> getAllTodo() {
        return todoRepository.findAll();
    }

    @Override
    public boolean DeleteTodo(int Id) {
        try {
            todoRepository.deleteById(Id);
            return true;
        } catch (EmptyResultDataAccessException ex) {
            // Handle the case where the todo with the given id was not found
            return false;
        }
    }

    @Override
    public boolean UpdateTodo(int Id, Todo updatedTodo) {
        try {
            Optional<Todo> optionalTodo = todoRepository.findById(Id);

            if (optionalTodo.isPresent()) {
                Todo existingTodo = optionalTodo.get();

                existingTodo.setTitle(updatedTodo.getTitle());
                existingTodo.setLastUpdatedDate(new Date());

                // Save the updated entity back to the database
                todoRepository.save(existingTodo);
                return true;
            } else {
                // Handle the case where the todo with the given id was not found
                return false;
            }
        } catch (EmptyResultDataAccessException ex) {
            // Handle other exceptions if needed
            return false;
        }
    }
}
