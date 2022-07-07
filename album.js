const albumWrapper = document.createElement('div');
albumWrapper.classList.add('album-wrapper')

const mainWrapper = document.querySelector('#main-wrapper');
mainWrapper.append(albumWrapper);


function callAlbum(){
fetch('https://jsonplaceholder.typicode.com/albums?_limit=50')
    .then(res => res.json())
    .then(albums => {
        albums.map(album => {
        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        albumWrapper.append(albumItem);

        let albumTitle = document.createElement('h2');
        albumTitle.classList.add('album-title');
        albumTitle.textContent = album.title;

        let albumAuthor = document.createElement('p');
        albumAuthor.classList.add('album-author');

        albumItem.append(albumTitle, albumAuthor);
        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
        .then(res => res.json())
        .then(author => {
          albumAuthor.innerHTML = `Author: <a href="https://jsonplaceholder.typicode.com/users/${album.userId}">${author.name}</a>`;
        })

        fetch(`https://jsonplaceholder.typicode.com/albums/${album.userId}/photos`)
        .then(res => res.json())
        .then(photos => {
            photos.map(photo => {
                let photoItem = document.createElement('img');
                photoItem.classList.add('album-photos')
                photoItem.src = photo.url;
                photoItem.innerHTML = `<a href="${photo.url}">Photos: ${photo.url}</a>`;
                albumItem.append(photoItem)
            })
        })
        })
    })
}

callAlbum();