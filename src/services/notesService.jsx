import { get } from 'axios'

const apiUrl = 'https://api.myjson.com/bins/'

export const getUsers = () => get(`${apiUrl}thbgx`)

export const getUser = id => get(`${apiUrl}orzsh`)

export const getNotes = id => get(`${apiUrl}7if8x`)
