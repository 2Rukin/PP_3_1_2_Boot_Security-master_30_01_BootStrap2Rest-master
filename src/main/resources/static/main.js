// Код для выполнения после загрузки HTML

$(document).ready(function () {

    getUsersTable();


});


// // Добавляем обработчик события click на кнопку "Edit"
// const editButton = document.querySelector(`#editButton-${user.id}`);
// editButton.addEventListener("click", () => {
//     // Обработчик события click на кнопку "Edit"
//     console.log(`Нажата кнопка Edit для пользователя с id=${user.id}`);
//     // Здесь можно добавить код для открытия модального окна и заполнения его данными пользователя
// });



/*
Код $(this).closest('tr').attr('id') получает значение атрибута id ближайшего родительского элемента tr,
 т.е. строки таблицы, в которой находится кнопка "Edit".
 Далее метод split() разделяет строку на массив строк, используя символ-разделитель '-'.
  Таким образом, мы получаем массив, состоящий из двух элементов: первый элемент - строка "tr",
   которую мы не используем, а второй элемент - ID пользователя.
let userId = $(this).closest('tr').attr('id').split('-')[1];
Затем мы используем [1] для получения второго элемента массива


$('button[data-bs-target="#editModal"]').on('click', function () {
    let userId = $(this).closest('tr').attr('id').split('-')[1];
    console.log('Кнопка "Edit" для пользователя с ID ' + userId + ' была нажата.');

});

*/




// // Обработчик событий для кнопки "Delete"
// $('.delete-user').click(function () {
//
//     getUserById(function (user) {
//
//
//     })
//
//
// });





/*
исполняемая функция, которая получает форму "edit-form-${user.id}" и
проверяет все теги input и select внутри нее на наличие атрибута "readonly".
Если атрибута нет, то функция устанавливает его:


function setReadonlyFields(user) {
    const form = document.querySelector(`#edit-form-${user.id}`);
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');

    [...inputs, ...selects].forEach(element => {
        if (!element.readonly) {
            element.readonly = true;
        }
    });
}

//Чтобы вызвать эту функцию, вы можете использовать следующий код:
// setReadonlyFields(user);
 */
