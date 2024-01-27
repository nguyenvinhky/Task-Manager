import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import Message from './Message';
import ModalEdit from './ModalEdit';
import Header from './Header';

let EngPoint = "http://localhost:8080/todo"

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [message, setMessage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const formatDateTime = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const formattedTime = new Date(date).toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return `${formattedDate} ${formattedTime}`;
    };


    const fetchTodos = () => {
        axios.get(`${EngPoint}/getAllTodo`)
            .then(response => {
                const formattedTodos = response.data.map(todo => {
                    const formattedCreatedDate = formatDateTime(todo.createdDate);
                    const formattedLastUpdatedDate = formatDateTime(todo.lastUpdatedDate);

                    return {
                        ...todo,
                        createdDate: formattedCreatedDate,
                        lastUpdatedDate: formattedLastUpdatedDate,
                    };
                });

                setTodos(formattedTodos);
            })
            .catch(error => console.error('Error fetching todos:', error));
    };


    const showMessage = (text, type = 'default') => {
        setMessage({ text, type });

        // Clear message after 3 seconds
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const addTodo = () => {
        if (title != "") {
            axios.post(`${EngPoint}/add`, { title })
                .then(response => {
                    setTodos([...todos, response.data]);
                    setTitle('');
                    fetchTodos();
                    showMessage(response.data, 'success');
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                    showMessage('Error adding todo', 'error');
                });
        }
        else {
            showMessage("Can't leave the title empty !!!", 'warning');
        }
    };

    const confirmDelete = () => {
        if (todoToDelete) {
            // Make delete request here
            axios.delete(`${EngPoint}/deleteTodo/${todoToDelete}`)
                .then(response => {
                    setTodos(todos.filter(todo => todo.id !== todoToDelete));
                    setTodoToDelete(null);
                    setShowModal(false);
                    showMessage(response.data, 'success');
                })
                .catch(error => {
                    console.error('Error deleting todo:', error);
                    showMessage('Error deleting todo', 'error');
                });
        }
    };

    const deleteTodo = (id) => {
        setTodoToDelete(id);
        setShowModal(true);
    };

    const editTodo = (id, title) => {
        setTodoToEdit({ id, title });
        setShowEditModal(true);
    };

    const saveEditedTodo = (editedTitle) => {
        if (todoToEdit) {
            // Make update request here
            axios.put(`${EngPoint}/updateTodo/${todoToEdit.id}`, { title: editedTitle })
                .then(response => {
                    setTodos(todos.map(todo =>
                        todo.id === todoToEdit.id ? { ...todo, title: editedTitle } : todo
                    ));
                    fetchTodos();
                    showMessage(response.data, 'success');
                })
                .catch(error => {
                    console.error(response.data, error);
                    showMessage(response.data, 'error');
                });
        }
    };

    const closeEditModal = () => {
        setTodoToEdit(null);
        setShowEditModal(false);
    };

    const closeModal = () => {
        setTodoToDelete(null);
        setShowModal(false);
    };

    return (
        <div>
            {message && (
                <Message
                    text={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}
            <div className="flex items-center justify-center pt-5">
                <div className="relative flex">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="block p-3 pl-4 w-96 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input your task . . ." required />
                    <button onClick={addTodo} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Todo</button>
                </div>
            </div>
            <div className='flex min-h-screen justify-center bg-gradient-to-br'>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <div className="overflow-x-auto relative shadow-md pt-4">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-4 px-16">Number</th>
                                <th scope="col" className="py-4 px-16">Task Name</th>
                                <th scope="col" className="py-4 px-16">Created Date</th>
                                <th scope="col" className="py-4 px-16">Last Updated Date</th>
                                <th scope="col" className="py-3 px-10">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map((todo, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-16">{index + 1}</td>
                                    <td className="py-4 px-16">{todo.title}</td>
                                    <td className="py-4 px-16">{todo.createdDate}</td>
                                    <td className="py-4 px-16">{todo.lastUpdatedDate}</td>
                                    <td className="py-4 px-6 flex">
                                        <a className='cursor-pointer' x-data="{ tooltip: 'Delete' }"
                                           onClick={() => deleteTodo(todo.id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                                x-tooltip="tooltip"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </a>
                                        <a className='cursor-pointer pl-4' x-data="{ tooltip: 'Edite' }"
                                           onClick={() => editTodo(todo.id, todo.title)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                                x-tooltip="tooltip"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* Use the Modal component */}
                        <Modal isOpen={showModal} onClose={closeModal} onConfirm={confirmDelete} />

                        {/* Use the ModalEdit component for editing todos */}
                        <ModalEdit
                            isOpen={showEditModal}
                            onClose={closeEditModal}
                            onSave={saveEditedTodo}
                            initialTitle={todoToEdit ? todoToEdit.title : ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo
