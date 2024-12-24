"use strict";

let hContainerStorage = {};

function remove_itm_ls(...xNames) {
    for (const name of xNames) {
        remove_itm__ls(name);
    }
}

function set_storage_itm__ls(name, val) {
    localStorage.setItem(name, val);
}

function get_storage_itm__ls(name) {
    checkObjValid(name);
    return localStorage.getItem(name);
}

function remove_itm__ls(name) {
    localStorage.removeItem(name);
}

function set_storage_obj__ls(xName, xObj) {
    const saveString = JSON.stringify(xObj);
    localStorage.setItem(xName, saveString);
}

function get_storage_obj__ls(xName) {
    const getVal = localStorage.getItem(xName);

    const finVal = (getVal) ? JSON.parse(getVal) : null;

    return finVal;
}
