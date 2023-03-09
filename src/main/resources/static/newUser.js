$(document).ready(function () {
   // заполняем селектор ролей
    getRoles(function (roles) {
        let rolesSet = $("#rolesSet");
        roles.forEach(role => {
            rolesSet.append('<option value="'+ role.id +  '" id= "' + role.roleName + '">' + role.roleNameNoPrefix + '</option>');

        });

    })

    let button = document.querySelector("#addNewUser-btn");
    button.addEventListener("click", function () {

        let selectedRoles = $("#rolesSet option:selected").map(function () {

              // Создаем объект с двумя свойствами id;
            return {
                id: this.value,
                roleName: this.id
            }
        }).get();

        let json = JSON.stringify({
            userName: $("#inputUserName").val(),
            lastName: $("#inputLastName").val(),
            age: $("#inputAge").val(),
            password: $("#inpPassword").val(),
            email: $("#inputEmail").val(),
            rolesSet: selectedRoles
        });
        console.log("Данные с формы")
        console.log(json)

        $.ajax({
            url: '/api/users',
            dataType: 'json',
            type: "POST",
            cache: false,
            contentType: 'application/json',
            data:json,
            success: function(result) {
                // Создаем запись для нового пользователя
                let roles = '';
                $.each(result.rolesSet, function(index, role) {
                    roles += role.roleNameNoPrefix + ' ';
                });
                let newRow = createTableRow(result, roles);

                // Добавляем запись в начало таблицы
                // $('#usersTable-tbody').prepend(newRow);
                $('#usersTable-tbody').append(newRow);

                // Скрываем модальное окно
                // $('#addUserModal').modal('hide');
                // получаем ссылку по ID
                let usersTableLink = document.querySelector('#usersTable-tab');

                // нажимаем на ссылку
                usersTableLink.click();
            },
            error: function(xhr, status, error) {
                // при ошибке выводим сообщение об ошибке
                alert("Ошибка при обновлении пользователя: " + error);
            }
        });



    });
});

// // Функция для получения данных о ролях
//     function  getRoles(callback) {
//         $.get("/api/roles", function (data) {
//             // Создаем новый массив для ролей
//             let roles = [];
//             for (let i = 0; i < data.length; i++) {
//                 let role = data[i];
//                 roles.push({
//                     id: role.id,
//                     roleName: role.roleName,
//                     roleNameNoPrefix: role.roleNameNoPrefix,
//                 })
//             }
//             callback(roles)
//         })
//
//     }


// Получаем роли с сервера и создаем опции для выпадающего списка, колбэк массив ролей
// function getOptionsToSelect() {
//     // Вернем Promise, который будет разрешен, когда данные будут получены
//     return new Promise(function (resolve, reject) {
//         let rolesArray = [];
//
//         $.get("/api/roles", function (data) {
//             let rolesSet = $("#rolesSet");
//             data.forEach(role => {
//                 rolesSet.append('<option value="' + role.roleNameNoPrefix + '">' + role.roleNameNoPrefix + '</option>');
//                 rolesArray.push(role);
//             });
//
//             // Разрешим Promise с массивом ролей
//             resolve(rolesArray);
//         }).fail(function () {
//             // Отклоним Promise в случае ошибки
//             reject(Error("Failed to fetch roles"));
//         });
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


    // function send_user(promise) {
    //     promise.then(function (json) {
    //         console.log("test");
    //         console.log(json);
    //
    //         $.ajax({
    //             url: '/api/users',
    //             dataType: 'json',
    //             type: "POST",
    //             cache: false,
    //             contentType: 'application/json',
    //             data: json
    //         });
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }
