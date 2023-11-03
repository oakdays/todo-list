import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import uuid4 from 'uuid4'

import type ToDo from '@/types/ToDo'
import ToDoSorting from '@/types/ToDoSorting'

export const useToDosStore = defineStore('todos', () => {
  const openItemId = ref<string>('')
  const search = ref<string>('')
  const activeSorting = ref<ToDoSorting>(ToDoSorting.Name)

  // main list to dos

  const toDos = ref<Array<ToDo>>([
    { id: '1', createdAt: 1699029424534, text: 'Buy groceries', isDone: false },
    { id: '2', createdAt: 1699029448524, text: 'Read a book', isDone: false },
    { id: '3', createdAt: 1699029468524, text: 'Clean the house', isDone: true },
    { id: '4', createdAt: 1699029488524, text: 'Text family', isDone: true },
    { id: '5', createdAt: 1699029508524, text: 'Plan trip', isDone: false }
  ])

  const pendingToDos = computed<Array<ToDo>>(() => {
    return toDos.value.filter((toDo: ToDo) => !toDo.isDone)
  })

  const doneToDos = computed<Array<ToDo>>(() => {
    return toDos.value.filter((toDo: ToDo) => toDo.isDone)
  })

  /**
   * If we want to filter and sort to dos in the main list,
   * we can implement getters for them as well.
   *
   * const filteredToDos = computed<Array<ToDo>>(() => {
   *  return toDos.value.filter((toDo: ToDo) => toDo.text.toLowerCase().includes(search.value.toLowerCase()))
   * })
   *
   * const sortedToDos = computed<Array<ToDo>>(() => {
   *   return filteredToDos.value.sort((a: ToDo, b: ToDo) => {
   *     if (activeSorting.value === ToDoSorting.Name) {
   *       if (a.text.toLowerCase() < b.text.toLowerCase()) return -1
   *       if (a.text.toLowerCase() > b.text.toLowerCase()) return 1
   *       return 0
   *     } else if (activeSorting.value === ToDoSorting.CreatedAt) {
   *       return b.createdAt - a.createdAt
   *     }
   *     return 0
   *   })
   * })
   */

  // backlog to dos

  const backlogToDos = ref<Array<ToDo>>([])

  const filteredBacklogToDos = computed<Array<ToDo>>(() => {
    return backlogToDos.value.filter((toDo: ToDo) =>
      toDo.text.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  const sortedBacklogToDos = computed<Array<ToDo>>(() => {
    return filteredBacklogToDos.value.sort((a: ToDo, b: ToDo) => {
      if (activeSorting.value === ToDoSorting.Name) {
        if (a.text.toLowerCase() < b.text.toLowerCase()) return -1
        if (a.text.toLowerCase() > b.text.toLowerCase()) return 1
        return 0
      } else if (activeSorting.value === ToDoSorting.CreatedAt) {
        return b.createdAt - a.createdAt
      }
      return 0
    })
  })

  const pendingBacklogToDos = computed<Array<ToDo>>(() => {
    return sortedBacklogToDos.value.filter((toDo: ToDo) => !toDo.isDone)
  })

  const doneBacklogToDos = computed<Array<ToDo>>(() => {
    return sortedBacklogToDos.value.filter((toDo: ToDo) => toDo.isDone)
  })

  // actions

  function setOpenItemId(id: string) {
    if (openItemId.value !== id) openItemId.value = id
  }

  function addToDo(text: string) {
    const newToDo = { id: uuid4(), createdAt: Date.now(), text, isDone: false }
    toDos.value.push(newToDo)
    return newToDo
  }

  function deleteToDo(id: string) {
    // only used in main list, so we delete from it
    toDos.value.splice(
      toDos.value.findIndex((toDo) => toDo.id === id),
      1
    )
    setOpenItemId('')
  }

  function moveToBacklog(id: string) {
    const toDoToMove = toDos.value.find((toDo) => toDo.id === id) as ToDo
    backlogToDos.value.push({ ...toDoToMove })
    toDos.value.splice(toDos.value.indexOf(toDoToMove), 1)
    setOpenItemId('')
  }

  function moveToMainList(id: string) {
    const toDoToMove = backlogToDos.value.find((toDo) => toDo.id === id) as ToDo
    toDos.value.push({ ...toDoToMove })
    backlogToDos.value.splice(backlogToDos.value.indexOf(toDoToMove), 1)
  }

  function addToDoInBacklog(text: string) {
    const newToDo = addToDo(text)
    moveToBacklog(newToDo.id)
  }

  function setSorting(sorting: ToDoSorting) {
    activeSorting.value = sorting
  }

  return {
    search,
    openItemId,
    toDos,
    pendingToDos,
    doneToDos,
    backlogToDos,
    pendingBacklogToDos,
    doneBacklogToDos,
    setOpenItemId,
    addToDo,
    deleteToDo,
    moveToBacklog,
    moveToMainList,
    addToDoInBacklog,
    setSorting
  }
})
