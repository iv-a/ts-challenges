// const fs = require('fs');
// const path = require('path');
//
// const currentDirectory = process.cwd();
// let tasksList = [];
//
// // Пройдитесь по каждой папке в текущей директории
// fs.readdirSync(currentDirectory).forEach(folder => {
//   const folderPath = path.join(currentDirectory, folder);
//   const readmePath = path.join(folderPath, 'README.md');
//
//   if (fs.statSync(folderPath).isDirectory() && fs.existsSync(readmePath)) {
//     const content = fs.readFileSync(readmePath, 'utf-8');
//
//     // Извлечь строку с задачей
//     const match = content.match(/<h1>.*?<\/h1>/);
//     if (match) {
//       const taskString = match[0].replace(/<h1>/, '<p>').replace(/<\/h1>/, '</p>');
//       const wrappedString = `<a href="./${folder}/">${taskString}</a>`;
//       tasksList.push(`<li>${wrappedString}</li>`);
//     }
//   }
// });
//
// // Создать новый .md файл и записать в него список найденных строк в виде <ul>
// const ulList = ['<ol>', ...tasksList, '</ol>'].join('\n');
// fs.writeFileSync(path.join(currentDirectory, 'tasks.md'), ulList);
//
// console.log('Задачи были успешно извлечены и записаны в tasks.md в виде списка <ul>!');

const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();
let tableRows = [];
let taskNumber = 0; // Номер задачи

// Заголовок таблицы
tableRows.push(`
<table>
  <tr>
    <th>№</th>
    <th>Задача</th>
    <th>Тэги</th>
  </tr>
`);

// Пройдитесь по каждой папке в текущей директории
fs.readdirSync(currentDirectory).forEach(folder => {
  const folderPath = path.join(currentDirectory, folder);
  const readmePath = path.join(folderPath, 'README.md');

  if (fs.statSync(folderPath).isDirectory() && fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, 'utf-8');

    // Извлечь строку с задачей
    const match = content.match(/<h1>.*?<\/h1>/);
    if (match) {
      taskNumber++; // Увеличиваем номер задачи

      const h1Content = match[0].replace(/<h1>/, '').replace(/<\/h1>/, '');

      // Извлечь текст и изображения
      const text = h1Content.replace(/<img.*?>/g, '').trim();
      const images = (h1Content.match(/<img.*?>/g) || []).join(' ');

      tableRows.push(`<tr><td>${taskNumber}</td><td><a href="./${folder}/"><h4>${text}</h4></a></td><td>${images}</td></tr>`);
    }
  }
});

tableRows.push(`
</table>
</body>
</html>
`);

// Создать новый .md файл и записать в него таблицу
fs.writeFileSync(path.join(currentDirectory, 'tasks.md'), tableRows.join('\n'));

console.log('Задачи были успешно извлечены и записаны в tasks.md в виде таблицы с номерами!');
