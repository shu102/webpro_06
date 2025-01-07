"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 投稿ボタン
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${name}&message=${message}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch("/post", params)
    .then((response) => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then(() => {
        document.querySelector('#message').value = "";
    });
});

// チェックボタン
document.querySelector('#check').addEventListener('click', () => {
    const params = { method: "POST", body: '', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    fetch("/check", params)
    .then((response) => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then((response) => {
        let value = response.number;
        if (number != value) {
            const params = {
                method: "POST",
                body: `start=${number}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            fetch("/read", params)
            .then((response) => {
                if (!response.ok) throw new Error('Error');
                return response.json();
            })
            .then((response) => {
                number += response.messages.length;
                for (let mes of response.messages) {
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    // いいねボタン
                    let like_button = document.createElement('button');
                    like_button.innerText = `いいね (${mes.likes || 0})`;
                    like_button.addEventListener('click', () => {
                        const params = {
                            method: "POST",
                            body: `id=${mes.id}`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        };
                        fetch('/like', params)
                        .then((response) => {
                            if (!response.ok) throw new Error('Error');
                            return response.json();
                        })
                        .then((data) => {
                            like_button.innerText = `いいね (${data.likes})`;
                        });
                    });

                    // 編集ボタン
                    let edit_button = document.createElement('button');
                    edit_button.innerText = "編集";
                    edit_button.addEventListener('click', () => {
                        let new_message = prompt("新しいメッセージを入力してください", mes.message);
                        if (new_message) {
                            const params = {
                                method: "PUT",
                                body: `id=${mes.id}&message=${encodeURIComponent(new_message)}`,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            };
                            fetch(`/edit/${mes.id}`, params)
                            .then((response) => {
                                if (!response.ok) throw new Error('Error');
                                return response.json();
                            })
                            .then((data) => {
                                mes_area.innerText = data.updatedMessage.message;
                            });
                        }
                    });

                    // 削除ボタン
                    let delete_button = document.createElement('button');
                    delete_button.innerText = "削除";
                    delete_button.addEventListener('click', () => {
                        if (confirm("この投稿を削除しますか？")) {
                            const params = {
                                method: "DELETE",
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            };
                            fetch(`/delete/${mes.id}`, params)
                            .then((response) => {
                                if (!response.ok) throw new Error('Error');
                                return response.json();
                            })
                            .then(() => {
                                bbs.removeChild(cover);
                            });
                        }
                    });

                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    cover.appendChild(like_button);
                    cover.appendChild(edit_button);
                    cover.appendChild(delete_button);

                    bbs.appendChild(cover);
                }
            });
        }
    });
});

// 検索ボタン
document.querySelector('#search').addEventListener('click', () => {
    const keyword = document.querySelector('#keyword').value;
    const params = {
        method: "POST",
        body: `keyword=${encodeURIComponent(keyword)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch('/search', params)
    .then((response) => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then((response) => {
        bbs.innerHTML = "";
        for (let mes of response.messages) {
            let cover = document.createElement('div');
            cover.className = 'cover';

            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = mes.name;

            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;

            cover.appendChild(name_area);
            cover.appendChild(mes_area);
            bbs.appendChild(cover);
        }
    });
});
