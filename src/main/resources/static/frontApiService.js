// Функция возвращает массив ролей от API
function getRoles(callback) {
    $.get("/api/roles", function (data) {
        // Создаем новый массив для ролей
        let roles = [];
        for (let i = 0; i < data.length; i++) {
            let role = data[i];
            roles.push({
                id: role.id,
                roleName: role.roleName,
                roleNameNoPrefix: role.roleNameNoPrefix,
            })
        }
        console.log("тест клика")
        callback(roles)
    })
    // $("#myModal-EditForm").show();
    // Далее можно добавить код для отображения модального окна с формой редактирования пользователя.
};


// Функция получения пользователя от  API по user.id
function getUserById(userId, callback) {
    console.log('сейчас получим пользователя по ID ' + userId + ' из базы');

    // Отправляем GET-запрос на сервер для получения данных пользователя
    $.get(`/api/users/${userId}`, function (data) {
        // Создаем новый объект для пользователя
        let user = {
            id: data.id,
            userName: data.userName,
            lastName: data.lastName,
            age: data.age,
            email: data.email,
            rolesSet: []
        };
        data.rolesSet.forEach(role => {
            user.rolesSet.push({
                id: role.id,
                roleName: role.roleName,
                roleNameNoPrefix: role.roleNameNoPrefix
            });
        });
        callback(user)
    });
}

// Функция для получения всех пользователей
function getUsers(callback) {
    $.get("/api/users", function (data) {
        // Создаем новый массив для пользователей
        let users = [];
        // Итерируемся по каждому пользователю в полученных данных
        for (let i = 0; i < data.length; i++) {
            let user = data[i];
            let roles = [];

            // Итерируемся по каждой роли в ролевом наборе пользователя
            for (let j = 0; j < user.rolesSet.length; j++) {
                let role = user.rolesSet[j];
                roles.push({
                    id: role.id,
                    roleName: role.roleName,
                    roleNameNoPrefix: role.roleNameNoPrefix,
                });
            }

            // Добавляем пользователя и его роли в массив пользователей
            users.push({
                id: user.id,
                userName: user.userName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                password: user.password,
                rolesSet: roles,
            });
        }

        // Вызываем колбэк с массивом пользователей
        callback(users);
    });
}

// Создает строку
function createTableRow(user, roles) {
    let tableRow = '';

    tableRow += `
        <tr id="tr-${user.id}">
            <td id="id">${user.id}</td>
            <td id="userName">${user.userName}</td>
            <td id="lastName">${user.lastName}</td>
            <td id="age">${user.age}</td>
            <td id="email">${user.email}</td>
            <td id="roles">${roles}</td>
            <td id="edit-${user.id}">
                            <button type="button" class="btn btn-info" data-bs-toogle="modal"
                            data-bs-target="#editModal" 
                            onclick="addEditEventListener(${user.id})">Edit</button>
            </td>
            <td id="delete-${user.id}">
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#deleteModal" 
                                    id="delete-btn-${user.id}"
                                    onclick="addDeleteEventListenerBackup(${user.id})">Delete</button>

            </td>
        </tr>
    `;
    return tableRow;
}

function fillFormValuesDelete(user) {

    $('#delete-id').val(user.id);
    $('#delete-userName').val(user.userName);
    $('#delete-lastName').val(user.lastName);
    $('#delete-age').val(user.age);
    $('#delete-email').val(user.email);
    $('#delete-password').val(''); // Очищаем поле пароля
    $('#delete-role').val(user.rolesSet.map(role => role.roleNameNoPrefix)); // Выбираем соответствующие опции в списке ролей
}


// Заполняем значения полей формы
function fillFormValues(user) {
    console.log("fillFormValues")
    $('#edit-id').val(user.id);
    $('#edit-userName').val(user.userName);
    $('#edit-lastName').val(user.lastName);
    $('#edit-age').val(user.age);
    $('#edit-email').val(user.email);
    $('#edit-password').val(''); // Очищаем поле пароля
    $('#edit-role').val(user.rolesSet.map(role => role.id)); // Выбираем соответствующие опции в списке ролей
}

// берет данные с формы и возвращает user
function getDataFromForm() {
    let user = {
        id: $('#edit-id').val(),
        userName: $('#edit-userName').val(),
        lastName: $('#edit-lastName').val(),
        age: $('#edit-age').val(),
        email: $('#edit-email').val(),
        password: $('#edit-password').val(),
        rolesSet: $("#edit-role option:selected").map(function () {
            return {
                id: this.value,
                roleName: this.id

            }
        }).get()
    };
    return user;
}

// обновляет строку  данными от АПИ
function updateTableRow(userId) {

    // Используем функцию getUserById для обновления ячеек таблицы
    getUserById(userId, function (user) {
        // Создаем новые значения для ячеек таблицы на основе полученных данных пользователя
        const newId = user.id;
        const newUserName = user.userName;
        const newLastName = user.lastName;
        const newAge = user.age;
        const newEmail = user.email;
        const newRoles = user.rolesSet.map(role => role.roleNameNoPrefix).join(', ');

        // Находим нужную строку таблицы
        const row = $(`#tr-${user.id}`);

        // Заменяем значения ячеек таблицы на новые значения
        row.find(`#id`).text(newId);
        row.find(`#${user.id}-${user.userName}`).text(newUserName);
        row.find(`#${user.id}-${user.lastName}`).text(newLastName);
        row.find(`#${user.id}-${user.age}`).text(newAge);
        row.find(`#${user.id}-${user.email}`).text(newEmail);
        row.find(`#${user.id}-roles`).text(newRoles);
    });

}

function getUsersTable() {
    getUsers(function (users) {
        console.log(users)
        //    Создаем записи в таблице
        let tableRows = '';
        $.each(users, function (index, user) {
            let roles = '';
            $.each(user.rolesSet, function (index, role) {
                roles += role.roleNameNoPrefix + ' ';
            });
            tableRows += createTableRow(user, roles)

        });

        $('#usersTable-tbody').html(tableRows);

    })
}

function removeAllOptions(select) {
    select = select || document.querySelector('select'); // по умолчанию выбираем первый select на странице
    let options = select && select.options;
    if (!options || !options.length) return;
    while (options.length) {
        select.removeChild(options[0]);
    }
}

function deleteHide() {
    let select = document.querySelector('delete-role')
    removeAllOptions(select)
    console.log("document.querySelector('delete-role')")
    console.log(select)
    deleteModalWindow.hide()
}

// работаем с tr
function addDeleteEventListenerBackup(userId) {
    console.log("Нажата DELETE");
    const tr = document.querySelector(`#tr-${userId}`);
    deleteModalWindow = new bootstrap.Modal($("#deleteModal")[0], {userId});


    const tds = tr.querySelectorAll('td');
    const deleteForm = document.querySelector('#deleteForm');

    tds.forEach(td => {
        const input = deleteForm.querySelector(`input[name="${td.id}"], select[name="${td.id}"]`);
        if (input) {
            if (input.nodeName === 'SELECT' && input.id === 'delete-role') { // проверка на nodeName и id
                const roles = td.textContent.trim().split(' ');

                // удаляем все старые options
                while (input.options.length > 0) {
                    input.remove(0);
                }

                roles.forEach((role) => {
                    const option = document.createElement('option');
                    option.value = role;
                    option.text = role;
                    input.appendChild(option);
                });
                input.disabled = true;
            } else {
                input.value = td.textContent.trim();
            }
        }
    });

    deleteModalWindow.show();
    // console.log(deleteModalWindow._config.userId);

    // deleteModalWindow.addEventListener('hidden.bs.modal', () => {
    //     const deleteForm = document.querySelector('#deleteForm');
    //     deleteForm.reset();
    //     console.log("окно очищено");
    // });
}

let deleteModalWindow;

function deleteUser() {

    let id = deleteModalWindow._config.userId

    console.log("получили такой id")
    console.log(id)
    $.ajax({
        url: "/api/users/" + id,
        type: "DELETE",
        success: function () {
            // alert("Удален");
            $("#deleteModal form")[0].reset();
            deleteModalWindow.hide()
            // Успешное удаление пользователя
            $("#tr-" + id).remove(); // Удаление строки из таблицы
        },
        error: function () {
            // Ошибка удаления пользователя
            alert("Ошибка при удалении пользователя");
        }
    });

}

let editModalWindow

function addEditEventListener(userId) {
    console.log("Нажата")

    getUserById(userId, function (user) {

        editModalWindow = new bootstrap.Modal($("#editModal")[0], {userId});
        fillFormValues(user)

        console.log(user)
        editModalWindow.show()
        console.log("окно показано")
    })
    return editModalWindow
}


function updateUser() {
    let json = JSON.stringify(getDataFromForm());

    $.ajax({
        type: "PUT",
        url: `/api/users/`,
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            // Reset the form inside the modal
            $("#editModal form")[0].reset();

            editModalWindow.hide()
            console.log(result)
            // Обновляем данные в таблице
            let tr = $(`#tr-${result.id}`);
            tr.find('#userName').text(result.userName);
            tr.find('#lastName').text(result.lastName);
            tr.find('#age').text(result.age);
            tr.find('#email').text(result.email);
            tr.find('#roles').text(result.rolesSet.map(role => role.roleNameNoPrefix));

            // alert("Пользователь успешно обновлен");
        },
        error: function (xhr, status, error) {
            alert("Ошибка при обновлении пользователя: " + error);
        }
    });
}

/*
исполняемая функция, которая получает форму "edit-form-${user.id}" и
проверяет все теги input и select внутри нее на наличие атрибута "readonly".
Если атрибута нет, то функция устанавливает его:
 */
// function setReadonlyFields() {
//     const window = document.querySelector(`#editModal`);
//     const form = document.querySelector(`#edit-form`);
//     const inputs = form.querySelectorAll('input');
//     const selects = form.querySelectorAll('select');
//
//     [...inputs, ...selects].forEach(element => {
//         if (!element.readonly) {
//             element.readonly = true;
//         }
//     });
// }

// function buildUserToSend() {
//     getOptionsToSelect().then(function (options) {
//         let selectedRoles = $("#rolesSet option:selected").map(function () {
//             return this.value;
//         }).get();
//         // оставил для  себя  - тут можно поискать в массиве и найденное поместить в roles
//         // let roles = selectedRoles.map(roleName => {
//         //     return options.find(option => option.roleName == roleName);
//         // });
//
//         let json = JSON.stringify({
//             userName: $("#inputUserName").val(),
//             lastName: $("#inputLastName").val(),
//             age: $("#inputAge").val(),
//             email: $("#inputEmail").val(),
//             password: $("#inpPassword").val(),
//             rolesSet: selectedRoles
//         });
//
//         console.log("test JSON");
//         console.log(json);
//         console.log("test Roles");
//         console.log(roles);
//
//
//         send_user(json); // Вызов функции send_user внутри then блока
//
//     }).catch(function (error) {
//         console.log(error);
//         // Обработка ошибки
//     });
// }


// Добавляем обработчик события click на кнопку "Edit"
// const editButton = document.querySelector(`#edit-${userId}`);
//
// editButton.addEventListener("click", () => {
//     // Обработчик события click на кнопку "Edit"
//     console.log(`Нажата кнопка Edit для пользователя с id=${userId}`);
//     // Здесь можно добавить код для открытия модального окна и заполнения его данными пользователя
// });

/*
Ошибка editModalWindow._element.find is not a function возникает потому, что свойство _element возвращает ссылку на элемент DOM, а не на объект jQuery. Метод find() является методом объекта jQuery и не доступен для элементов DOM.

Для решения этой проблемы вы можете обернуть ссылку на элемент DOM в объект jQuery, используя функцию $(). Вот как это можно сделать:

javascript
Copy code
const editModalWindow = new bootstrap.Modal($("#editModal")[0]);
const $modal = $(editModalWindow._element);
const $inputs = $modal.find('input');
const $selects = $modal.find('select');

[...$inputs, ...$selects].forEach(element => {
  if (!element.readOnly) {
    element.readOnly = true;
  }
});
Здесь мы используем функцию $() для обертывания ссылки на элемент DOM editModalWindow._element в объект jQuery $modal. Затем мы можем использовать метод find() для поиска всех элементов <input> и <select> внутри модального окна.

Затем мы можем использовать функцию setReadonlyFields() для установки атрибута readonly для каждого поля.

Обратите внимание, что в коде выше я использовал свойство readOnly с маленькой буквы, а не readonly, потому что в JavaScript свойства и методы чувствительны к регистру.



 */
/*
Чтобы добавить атрибут readonly к $inputs и атрибут aria-readonly к $selects, вы можете использовать метод attr() объекта jQuery, как показано ниже:

javascript
Copy code
const $inputs = $modal.find('input');
const $selects = $modal.find('select');

$inputs.attr('readonly', true);
$selects.attr('aria-readonly', true);
Здесь мы используем метод attr() объекта jQuery, чтобы установить атрибут readonly для всех элементов $inputs и атрибут aria-readonly для всех элементов $selects.

Значение true переданное в метод attr() устанавливает значение атрибута в readonly и aria-readonly соответственно.
 */
/*
Действительно, использование атрибута onclick в HTML-коде считается устаревшим и не рекомендуется в современном JavaScript. Вместо этого можно использовать методы объекта addEventListener(), который добавляет обработчики событий к элементам.

Вот пример, как можно изменить кнопку, чтобы использовать addEventListener() вместо атрибута onclick:

html
Copy code
<button type="button" class="btn btn-danger" data-bs-toggle="modal"
        data-bs-target="#editModal"
        id="delete-btn-${user.id}">Delete</button>
Затем в JavaScript-коде можно использовать следующую функцию, чтобы добавить обработчик события для кнопки:

javascript
Copy code
function addDeleteEventListener(userId) {
  console.log("Нажата DELETE");

  getUserById(userId, function (user) {
    const editModalWindow = new bootstrap.Modal($("#editModal")[0]);
    fillFormValues(user);

    // Получаем элемент <tr> при нажатии на кнопку
    const $tr = $(this).closest('tr');

    // Устанавливаем атрибут "readonly" и "aria-readonly" для полей в модальном окне
    const $modal = $(editModalWindow._element);
    const $inputs = $modal.find('input');
    const $selects = $modal.find('select');
    $inputs.attr('readonly', true);
    $selects.attr('aria-readonly', true);

    console.log(user);
    editModalWindow.show();
    console.log("окно показано");

    // Добавляем обработчик события для кнопки "Delete" в модальном окне
    const $deleteBtn = $modal.find(`#delete-btn-${user.id}`);
    $deleteBtn.on('click', function () {
      // Удаляем элемент <tr> из таблицы
      $tr.remove();

      // Закрываем модальное окно
      editModalWindow.hide();
    });
  });
}

// Добавляем обработчик событий для всех кнопок "Delete"
const deleteBtns = document.querySelectorAll('.btn-danger');
deleteBtns.forEach(function(btn) {
  const userId = btn.dataset.userId;
  btn.addEventListener('click', addDeleteEventListener.bind(btn, userId));
});
Здесь мы используем метод addEventListener() для каждой кнопки "Delete", чтобы добавить обработчик события. Мы также используем метод bind() для передачи аргументов в функцию addDeleteEventListener(). Мы передаем userId в качестве первого аргумента, а текущую кнопку в качестве контекста this.

В функции addDeleteEventListener() мы заменяем event.target на this для получения кнопки, на которую было нажато.
 */
/*
Для обработки клика на кнопке Delete и заполнения формы deleteForm данными из соответствующего tr элемента, можно использовать следующий код:

javascript
Copy code
function addDeleteEventListener(userId) {
  console.log("Нажата DELETE");
  const tr = document.querySelector(`#tr-${userId}`);
  const tds = tr.querySelectorAll('td');
  const deleteForm = document.querySelector('#deleteForm');

  tds.forEach(td => {
    const input = deleteForm.querySelector(`input[name="${td.id}"]`);
    if (input) {
      input.value = td.textContent.trim();
    }
  });

  const deleteModalWindow = new bootstrap.Modal($("#deleteModal")[0]);
  deleteModalWindow.show();
  console.log("окно показано");
}
Эта функция получает ID пользователя и находит соответствующий ему tr элемент. Затем, для каждого td элемента внутри tr элемента, она ищет input элемент с соответствующим именем (с помощью querySelector) и устанавливает ему значение, равное содержимому td элемента (с помощью textContent.trim()). Затем функция показывает модальное окно с помощью deleteModalWindow.show().

В коде создания таблицы у вас есть кнопка Delete с атрибутом data-bs-toogle, который должен быть data-bs-toggle вместо него, чтобы работала функция addDeleteEventListener().

Исправленный код создания таблицы с учетом этих изменений будет выглядеть следующим образом:

bash
Copy code
function createTableRow(user, roles) {
    let tableRow = '';

    tableRow += `
        <tr id="tr-${user.id}">
            <td id="${user.id}-${user.userName}">${user.userName}</td>
            <td id="${user.id}-${user.lastName}">${user.lastName}</td>
            <td id="${user.id}-${user.age}">${user.age}</td>
            <td id="${user.id}-${user.email}">${user.email}</td>
            <td id="${user.id}-roles">${roles}</td>
            <td id="edit-${user.id}">
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editModal" onclick="addEditEventListener(${user.id})">Edit</button>
            </td>
            <td id="delete-${user.id}">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" id="delete-btn-${user.id}" onclick="addDeleteEventListener(${user.id})">Delete</button>
            </td>
        </tr>
    `;
    return tableRow;
}

 */
/*
Если я правильно понял, вы хотите заполнить выбранные роли пользователя в форме удаления вместе с другими значениями, полученными из строки таблицы. В таком случае, вы можете изменить функцию addDeleteEventListener следующим образом:

javascript
Copy code
function addDeleteEventListener(userId) {
    console.log("Нажата DELETE");
    const tr = document.querySelector(`#tr-${userId}`);
    const deleteModalWindow = new bootstrap.Modal($("#deleteModal")[0]);

    console.log(tr)
    console.log(deleteModalWindow)

    const tds = tr.querySelectorAll('td');
    const deleteForm = document.querySelector('#deleteForm');
    console.log(deleteForm)

    tds.forEach(td => {
        const input = deleteForm.querySelector(`input[name="${td.id}"], select[name="${td.id}"]`);
        if (input) {
            if (input.nodeName === 'SELECT') {
                const selectedOptions = td.querySelectorAll('option[selected]');
                selectedOptions.forEach(option => {
                    const optionClone = option.cloneNode(true);
                    input.appendChild(optionClone);
                });
                input.disabled = true;
            } else {
                input.value = td.textContent.trim();
            }
            console.log(input)
        }
    });

    deleteModalWindow.show();
    console.log("окно показано");
}
Здесь мы добавили еще один селектор select[name="${td.id}"] для выбора элементов <select> в форме удаления. Мы также проверяем, является ли найденный элемент <select>, и если да, то копируем выбранные опции из строки таблицы в форму удаления и отключаем выбор в <select>. Затем мы устанавливаем значение входного элемента как обычно, если это текстовый ввод.
 input[name="${td.id}"] это CSS-селектор, который выбирает элемент input с атрибутом name, равным значению id атрибута элемента td.

Например, если у вас есть следующий элемент:

html
Copy code
<td id="user-name">John Doe</td>
то выражение input[name="user-name"] выберет следующий элемент input:

html
Copy code
<input type="text" name="user-name" value="">
Таким образом, когда вы используете выражение input[name="${td.id}"] внутри функции addDeleteEventListener(), вы находите соответствующий элемент формы, который должен быть заполнен значением текста внутри элемента td.
 */