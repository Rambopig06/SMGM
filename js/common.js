// // 로그인 관련 js코드입니다

// function loadCommonHeader() {
//     fetch('../html/common-header.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('common-header').innerHTML = data;
//             const scripts = document.getElementById('common-header').getElementsByTagName('script');
//             for (let script of scripts) {
//                 eval(script.innerHTML);
//             }
//         })
//         .catch(error => console.error('Error loading common-header:', error));
// }

// document.addEventListener('DOMContentLoaded', loadCommonHeader);

function loadCommonHeader() {
    fetch('../html/common-header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('common-header').innerHTML = data;
            updateLoginStatus();
        })
        .catch(error => console.error('Error loading common-header:', error));
}

function updateLoginStatus() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const loginStatus = document.getElementById('loginStatus');
    
    if (loggedInUser && loggedInUser.nickname) {
        loginStatus.textContent = loggedInUser.nickname + '님';
        loginStatus.href = '#';
        loginStatus.onclick = confirmLogout;
    } else {
        loginStatus.textContent = '로그인';
        loginStatus.href = '/login & join/login.html';
        loginStatus.onclick = null;
    }
}

// 게임 스코어 저장 함수
function saveGameScore(gameId, score) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const userId = loggedInUser.id;
        let gameScores = JSON.parse(localStorage.getItem(gameId)) || {};
        gameScores[userId] = score;
        localStorage.setItem(gameId, JSON.stringify(gameScores));
    }
}

// 게임 스코어 불러오기 함수
function getGameScores(gameId) {
    return JSON.parse(localStorage.getItem(gameId)) || {};
}

// 게임 스코어 표시 함수
function displayGameScores(gameId, containerId) {
    const scoresContainer = document.getElementById(containerId);
    const scores = getGameScores(gameId);
    let scoresHtml = '<h3>최고 점수</h3><ul>';
    
    for (const [userId, score] of Object.entries(scores)) {
        scoresHtml += `<li>${userId}: ${score}</li>`;
    }
    
    scoresHtml += '</ul>';
    scoresContainer.innerHTML = scoresHtml;
}

function confirmLogout(event) {
    event.preventDefault();
    if (confirm('로그아웃 하시겠어요?')) {
        sessionStorage.removeItem('loggedInUser');
        updateLoginStatus();
        alert('로그아웃되었습니다.');
        window.location.href = '/main_site/index.html'; // 메인 페이지로 이동
    }
}

document.addEventListener('DOMContentLoaded', loadCommonHeader);