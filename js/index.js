document.addEventListener('DOMContentLoaded', () => {
    let lastChangedBox = null; // 가장 최근에 변경된 텍스트 박스를 추적하는 변수
    let latestTextElement = null; // 가장 최근 입력된 텍스트를 표시할 요소

    // 랜덤한 색상을 생성하는 함수
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256); // 빨간색 채널 (0-255)
        const g = Math.floor(Math.random() * 256); // 초록색 채널 (0-255)
        const b = Math.floor(Math.random() * 256); // 파란색 채널 (0-255)

        return `rgb(${r}, ${g}, ${b})`;
    }

    // 새로운 textarea 생성 함수
    function createNewTextarea() {
        const newTextarea = document.createElement('textarea');
        newTextarea.className = 'vertical-textarea'; // 스타일을 적용할 수 있는 클래스명 설정
        newTextarea.placeholder = '여기에  혼잣말 입력';

        // 새로운 textarea의 스타일 설정
        newTextarea.style.margin = '60px 2px -10px 2px'; // 여백 설정
        newTextarea.style.width = '10px'; // 넓이 조정
        newTextarea.style.height = 'auto'; // 높이 자동 조정
        newTextarea.style.minHeight = '0px'; // 최소 높이 설정
        newTextarea.style.maxHeight = '400px'; // 최대 높이 설정
        newTextarea.style.resize = 'none'; // 크기 조절 비활성화
        newTextarea.style.border = '1px solid #ccc'; // 테두리
        newTextarea.style.padding = '9.95px'; // 안쪽 여백
        newTextarea.style.writingMode = 'vertical-rl'; // 세로 쓰기 모드
        newTextarea.style.textAlign = 'left'; // 텍스트 중앙 정렬
        newTextarea.style.overflowX = 'hidden'; // 가로 스크롤 비활성화
        newTextarea.style.overflowY = 'auto'; // 세로 스크롤 활성화
        newTextarea.style.display = 'fixed';

        // 폰트 크기 설정
        newTextarea.style.fontSize = '12px'; // 입력한 텍스트와 플레이스홀더 모두 적용
        newTextarea.style.color = '#333333'; // 텍스트 색상 설정

        // 스크롤바 스타일 설정
        newTextarea.style.overflowY = 'auto'; // 세로 스크롤바 자동 생성
        newTextarea.addEventListener('mouseenter', () => {
            newTextarea.style.scrollbarWidth = 'thin'; // Firefox에서 스크롤바 크기 조정
        });

        // 문서에 새로운 textarea 추가
        document.body.appendChild(newTextarea);

        // 웹킷 브라우저를 위한 스크롤바 스타일
        const style = document.createElement('style');
        style.textContent = `
            .vertical-textarea::-webkit-scrollbar {
                width: 3px; /* 스크롤바 너비 설정 */
            }
            .vertical-textarea::-webkit-scrollbar-track {
                background: #f0f0f0; /* 스크롤바 트랙 배경색 */
                border-radius: 100px; /* 스크롤바 모서리 둥글게 */
            }
            .vertical-textarea::-webkit-scrollbar-thumb {
                background-color: #00d6d6; /* 스크롤바 색상 */
                border-radius: 100px; /* 스크롤바 모서리 둥글게 */
            }
        `;
        document.head.appendChild(style);

        // 새로운 textarea를 문서의 가장 상단에 추가
        const container = document.querySelector('.person');
        container.insertBefore(newTextarea, container.firstChild);

        // 새로운 textarea에 자동 높이 조정 함수 적용
        autoResizeTextarea(newTextarea);

        // 새로운 textarea에 이벤트 리스너 추가
        newTextarea.addEventListener('input', () => {
            autoResizeTextarea(newTextarea);
            updateLatestText(newTextarea.value); // 입력된 텍스트 업데이트
        });

        newTextarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 기본 Enter 동작 방지
                createNewTextarea(); // 새로운 textarea 추가
            }
        });

        // 기본 윤곽선 제거
        newTextarea.style.outline = 'none';

        // 포커스 이벤트 처리
        newTextarea.addEventListener('focus', () => {
            newTextarea.style.boxShadow = '0 0 0 1.5px #00D3D3'; // 포커스 시 윤곽선 색상
        });

        newTextarea.addEventListener('blur', () => {
            newTextarea.style.boxShadow = 'none'; // 포커스 해제 시 윤곽선 제거
        });    

        // 새로운 textarea에 포커스 설정
        newTextarea.focus();

        // 텍스트 박스 스타일 변경
        changeTextBoxStyle();
    }

    // textarea의 높이를 자동으로 조정하는 함수
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto'; // 기존 높이 리셋
        textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 조정
    }

    // 텍스트 박스 스타일을 랜덤으로 변경하는 함수
    function changeTextBoxStyle() {
        const textBoxes = document.querySelectorAll('.textBox');
        if (textBoxes.length === 0) return;

        // 랜덤으로 텍스트 박스 선택
        const randomIndex = Math.floor(Math.random() * textBoxes.length);
        const selectedBox = textBoxes[randomIndex];

        // 가장 최근에 변경된 박스의 윤곽선 색상 제거
        if (lastChangedBox) {
            lastChangedBox.style.border = ''; // 윤곽선 제거
        }

        // 텍스트 박스 배경 색상은 고정 색상으로 설정
        selectedBox.style.backgroundColor = '#f0f0f0'; // 고정 색상

        const nameElements = selectedBox.querySelectorAll('.textBackground');
        nameElements.forEach(element => element.style.color = getRandomColor()); // 랜덤 텍스트 색상

        const textElements = selectedBox.querySelectorAll('p');
        textElements.forEach(element => element.style.color = getRandomColor()); // 랜덤 텍스트 색상

        // 최근에 변경된 박스 업데이트
        lastChangedBox = selectedBox;

        // 최근에 변경된 박스에 빨간 윤곽선 추가
        selectedBox.style.border = '3px solid red';
    }

    // 최신 텍스트를 업데이트하는 함수
    function updateLatestText(text) {
        if (!latestTextElement) {
            // 최신 텍스트 요소가 없으면 생성
            latestTextElement = document.createElement('div');
            latestTextElement.style.zIndex = '200';  // 원하는 z-index 값을 넣어줍니다.
            latestTextElement.style.position = 'absolute';
            latestTextElement.style.right = '0%';
            latestTextElement.style.marginRight = '95px';
            latestTextElement.style.top = '6%';
            latestTextElement.style.fontSize = '48px';
            //latestTextElement.style.fontFamily = '"Space Grotesk", sans-serif'; // 폰트 설정
            //latestTextElement.style.fontFamily = '"EF_jejudoldam"'; // 폰트 설정
            latestTextElement.style.fontFamily = '"BookkMyungjo-Bd"';
            latestTextElement.style.fontWeight = '700'; // 폰트 두께 설정 (예: bold)
            latestTextElement.style.writingMode = 'vertical-rl'; // 세로 쓰기 모드
            latestTextElement.style.textAlign = 'left'; // 텍스트 중앙 정렬
            latestTextElement.style.color = '#f0f0f0'; // 텍스트 색상
            latestTextElement.style.lineHeight = '523%'; // 행간 설정
            latestTextElement.style.letterSpacing = '0px'; // 자간 설정
            latestTextElement.style.textShadow = `
                1.5px 1.5px 0 #00a8a8, 
                -1.5px -1.5px 0 #00a8a8, 
                1.5px -1.5px 0 #00a8a8, 
                -1.5px 1.5px 0 #00a8a8
            `; // 윤곽선 색상 설정
            document.body.appendChild(latestTextElement);
        }

        latestTextElement.textContent = text;
    }

    // 페이지 로드 시 첫 번째 textarea를 생성
    createNewTextarea();

    // 페이지 로드 시 기존의 모든 textarea에도 높이 자동 조정 적용
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', () => autoResizeTextarea(textarea));
        autoResizeTextarea(textarea);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const numBoxes = 100; // 총 텍스트 박스 개수
    const positions = [
        { x: -10, y: 80 }, // 머리 1
        { x: -9.5, y: 90 }, // 머리 2
        { x: -10, y: 110 }, // 머리 3
        { x: -8, y: 135 }, // 머리 4
        { x: -10.5, y: 150 }, // 머리 5
        { x: -9, y: 170 }, // 머리 6
        { x: -11.5, y: 185 }, // 머리 7
        { x: -12, y: 90 }, // 머리 2
        { x: -12.5, y: 110 }, // 머리 3
        { x: -12.5, y: 135 }, // 머리 4
        { x: -12, y: 150 }, // 머리 5
        
        { x: -10, y: 205 }, // 어깨 1
        { x: -19, y: 205 }, // 어깨 2
        
        { x: -20, y: 220 }, // 상체 1
        { x: -13, y: 220 }, // 상체 2
        { x: -21.5, y: 245 }, // 상체 3
        { x: -13, y: 245 }, // 상체 4
        { x: -19, y: 260 }, // 상체 5
        { x: -10, y: 260 }, // 상체 6
        { x: -23, y: 275 }, // 상체 5
        { x: -11, y: 275 }, // 상체 6
        { x: -23.5, y: 290 }, // 상체 5
        { x: -11, y: 290 }, // 상체 6
        { x: -23.5, y: 310 }, // 상체 5
        { x: -11, y: 310 }, // 상체 6
        { x: -10, y: 330 }, // 상체 6
        { x: -5, y: 330 }, // 상체 6
        { x: -23.5, y: 350 }, // 상체 5
        { x: -11, y: 350 }, // 상체 6
        { x: -6, y: 350 }, // 상체 6
        { x: -23.5, y: 376 }, // 상체 5
        { x: -12.5, y: 376 }, // 상체 6
        { x: -9, y: 376 }, // 상체 6
        { x: -21, y: 390 }, // 상체 6
        { x: -12, y: 390 }, // 상체 6
        { x: -20.5, y: 400 }, // 상체 6
        { x: -12, y: 400 }, // 상체 6
        { x: -19.5, y: 415 }, // 상체 6
        { x: -21, y: 425 }, // 상체 6
        { x: -12, y: 425 }, // 상체 6
        { x: -22, y: 440 }, // 상체 6
        { x: -15, y: 440 }, // 상체 6
        { x: -23, y: 450 }, // 상체 6
        { x: -16, y: 450 }, // 상체 6
        
        { x: -17, y: 480 }, // 하체 1
        { x: -22.5, y: 480 }, // 하체 1
        { x: -16.5, y: 490 }, // 하체 1
        { x: -16, y: 500 }, // 하체 1
        { x: -22, y: 505 }, // 하체 1
        { x: -15, y: 515 }, // 하체 1
        { x: -20.5, y: 530 }, // 하체 1
        { x: -14.8, y: 530 }, // 하체 1
        { x: -21, y: 550 }, // 하체 1
        { x: -15.5, y: 550 }, // 하체 1
        { x: -15, y: 565 }, // 하체 1
        { x: -16, y: 565 }, // 하체 1
        { x: -20, y: 590 }, // 하체 1
        { x: -15.5, y: 580 }, // 하체 1
        { x: -14.5, y: 590 }, // 하체 1
        { x: -19.5, y: 610 }, // 하체 1
        { x: -13, y: 610 }, // 하체 1
        { x: -22.5, y: 630 }, // 하체 1
        { x: -13, y: 630 }, // 하체 1
        { x: -18, y: 630 }, // 하체 1
        { x: -19.5, y: 660 }, // 하체 1
        { x: -14.5, y: 660 }, // 하체 1
        { x: -10, y: 660 }, // 하체 1
        { x: -20, y: 680 }, // 하체 1
        { x: -24, y: 680 }, // 하체 1
        { x: -9.5, y: 680 }, // 하체 1
        { x: -20, y: 700 }, // 하체 1
        { x: -26, y: 700 }, // 하체 1
        { x: -9.8, y: 700 }, // 하체 1
        { x: -26, y: 715 }, // 하체 1
        { x: -6.8, y: 715 }, // 하체 1
        { x: -30, y: 730 }, // 하체 1
        { x: -25, y: 730 }, // 하체 1
        { x: -6, y: 730 }, // 하체 1
        { x: -6.5, y: 735 }, // 하체 1
        { x: -30, y: 750 }, // 하체 1
        { x: -29, y: 750 }, // 하체 1
        { x: -27, y: 750 }, // 하체 1
        { x: -7, y: 750 }, // 하체 1
        { x: -29, y: 765 }, // 하체 1
        { x: -27, y: 765 }, // 하체 1
        { x: -32, y: 780 }, // 하체 1
        { x: -6, y: 780 }, // 하체 1
        { x: -31, y: 785 }, // 하체 1
        { x: -5.5, y: 785 }, // 하체 1
        { x: -31, y: 805 }, // 하체 1
        { x: -5, y: 805 }, // 하체 1
        { x: -31.5, y: 825 }, // 하체 1
        { x: -4, y: 825 }, // 하체 1
        { x: -33.5, y: 840 }, // 하체 1
        { x: -3, y: 840 }, // 하체 1
        { x: -31.5, y: 860 }, // 하체 1
        { x: -3.5, y: 860 }, // 하체 1
        { x: -31, y: 880 }, // 하체 1
        { x: -2, y: 880 }, // 하체 1
        { x: -30, y: 895 }, // 하체 1
        { x: 1.2, y: 895 }, // 하체 1
        { x: 5, y: 895 }, // 하체 1
        { x: -31, y: 915 }, // 하체 1
        { x: -1.2, y: 915 }, // 하체 1
        { x: 2, y: 915 }, // 하체 1
        { x: -29.5, y: 935 }, // 하체 1
        { x: -27, y: 935 }, // 하체 1
        { x: 1.5, y: 935 }, // 하체 1
        { x: 6, y: 935 } // 하체 1
        
        // ... (여기에 텍스트 박스 위치 데이터가 들어갑니다)
    ];

    document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.querySelector('.random-button');
    randomButton.textContent = '집합';

    // 원래의 위치를 저장할 배열
    const originalPositions = [];

    // 모든 텍스트 박스를 랜덤으로 이동시키는 함수
    function randomizeTextBoxPositions() {
        const textBoxes = document.querySelectorAll('.textBox');
        textBoxes.forEach((box, index) => {
            // 원래 위치 저장
            if (originalPositions.length < textBoxes.length) {
                const rect = box.getBoundingClientRect();
                originalPositions.push({ x: rect.left, y: rect.top });
            }

            // 랜덤 위치 설정
            const randomX = Math.floor(Math.random() * window.innerWidth);
            const randomY = Math.floor(Math.random() * window.innerHeight);
            box.style.position = 'absolute';
            box.style.left = `${randomX}px`;
            box.style.top = `${randomY}px`;
        });
    }

    // 텍스트 박스를 원래 위치로 복귀시키는 함수
    function resetTextBoxPositions() {
        const textBoxes = document.querySelectorAll('.textBox');
        textBoxes.forEach((box, index) => {
            const { x, y } = originalPositions[index];
            box.style.left = `${x}px`;
            box.style.top = `${y}px`;
        });
    }

    // 버튼 클릭 이벤트 처리
    randomButton.addEventListener('click', () => {
        if (randomButton.textContent === '집합') {
            randomizeTextBoxPositions();
            randomButton.textContent = '복귀';
        } else {
            resetTextBoxPositions();
            randomButton.textContent = '집합';
        }
    });
});


    // 랜덤한 이름 생성 함수
    function getRandomName() {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack', 'Emily', 'Lucas', 'Chloe', 'Ethan', 'Noah', 'Kevin', 'Olivia', 'Brian', 'Linda', 'Karen', 'Megan', 'Henry', 'Oscar', 'Ruby', 'Dylan', 'Felix', 'Simon', 'Clara', 'Fiona', 'Hazel'];
        return names[Math.floor(Math.random() * names.length)];
    }

    // 랜덤한 텍스트 생성 함수 (감탄사와 인사말)
    function getRandomText() {
        //const texts = ['Yes', 'No', 'IDK', 'OK', 'OMG', 'Sure', 'Fine', 'Nope', 'Huh', 'What', 'Cool', 'Yikes', 'Wow', 'Agreed', 'Nah', 'Hooray', 'Sorry', 'Great', 'Ugh', 'Hey', 'Help', 'Gosh', 'Oops', 'Good', 'Aha', 'Yeah', 'Haha', 'Phew', 'Okey', 'Bravo'];
        const texts = [
            '잘 알겠어요', '맞아요', '그렇군요', '아, 그렇군요', '재미있네요', 
            '이해했어요', '그럴듯해요', '그럴 수도 있어요', '그렇겠어요', '맞아요', 
            '아하', '말이 안 돼요', '슬프네요', '그렇지 못해요', '흥미로워요', 
            '그럴듯해요', '확인했어요', '생각과 다른 것 같아요', '맞아요, 맞아요', 
            '잘 들었어요', '그렇네요', '네, 맞아요', '다른 생각은요?', '그렇군요', 
            '모르겠어요', '알겠습니다', '정확해요', '그럴듯해요', '잘 알겠어요', 
            '그건 아닙니다', '이해합니다', '정확히 알겠어요', '아, 아니에요', 
            '안 되겠어요', '좀 아쉬워요', '확인했습니다', '그럴 수 있어요', 
            '알겠어요', '제 생각과 다르네요', '그렇네요', '아쉽네요', '그런가요?', 
            '과연?', '그럴까요?', '그럴듯해요', '그럴 수 있겠어요', 
            '잘 이해했어요', '권하지 않아요'
        ];
    
        return texts[Math.floor(Math.random() * texts.length)];
    }
    

    // 텍스트 박스 생성 함수
    function createTextBox(index) {
        const textBox = document.createElement('div');
        textBox.className = 'textBox';
        
        const name = getRandomName();
        const textContent = getRandomText();

        // A는 배경 색상이 있는 텍스트, 나머지는 배경 없이
        const innerHTML = `
            <div class="textBackground">${name}</div>
            <p>${textContent}</p>
        `;

        textBox.innerHTML = innerHTML;
        document.querySelector('.person').appendChild(textBox);
        return textBox;
    }

    // 텍스트 박스 생성
    const textBoxes = positions.map((pos, index) => {
        const box = createTextBox(index);
        box.style.position = 'absolute';
        box.style.left = `${pos.x}px`;
        box.style.top = `${pos.y}px`;
        box.style.zIndex = Math.floor(Math.random() * 100); // 초기 z-index 설정
        return box;
    });
    
    let mouseX = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
    });

    function updatePosition() {
        textBoxes.forEach((textBox) => {
            const textBoxRect = textBox.getBoundingClientRect();
            const textBoxX = textBoxRect.left + window.scrollX; // 현재 X 좌표
            const distanceX = mouseX - textBoxX;

            // X축 거리 기반으로 속도 조절 (예: 가까울수록 더 빠르게)
            const maxSpeed = 0.1;
            const minSpeed = 0.01;
            const maxDistance = 2000; // 거리의 최대값 (속도가 최소로 될 거리)
            const speedX = minSpeed + (maxSpeed - minSpeed) * (1 - Math.min(Math.abs(distanceX) / maxDistance, 1));

            // Y 위치는 초기 위치로 고정
            const updatedX = textBoxX + distanceX * speedX;

            textBox.style.transform = `translateX(${updatedX}px)`;
        });

        requestAnimationFrame(updatePosition);
    }

    // 1초마다 z-index 랜덤화
    setInterval(() => {
        textBoxes.forEach((textBox) => {
            textBox.style.zIndex = Math.floor(Math.random() * 100);
        });
    }, 1000);

    updatePosition();
});


document.addEventListener('DOMContentLoaded', function() {
    const man = document.querySelector('.man');
    
    // 마우스 이동 이벤트를 감지
    document.addEventListener('mousemove', function(event) {
        // 뷰포트 내의 마우스 좌표 가져오기
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // 속도 조절을 위한 계수 (적절히 조절)
        const speedFactor = 0.5;
        
        // x축 속도 조절
        const speedX = (mouseX - window.innerWidth / 2) * speedFactor;
        const speedY = (mouseY - window.innerHeight / 2) * speedFactor;

        // 이미지 위치 업데이트
        man.style.position = 'absolute';
        man.style.left = `${mouseX - speedX}px`;
        man.style.top = `${mouseY - speedY}px`;
        man.style.transform = 'translate(-50%, -50%)'; // 이미지의 중심이 마우스 커서와 일치하도록 조정
    });
});

       // 모달 요소와 버튼
       const modal = document.getElementById('myModal');
       const smallMan = document.getElementById('small-man');
       const closeButton = document.querySelector('.modal-close');

       // small-man 클릭 시 모달 열기
       smallMan.addEventListener('click', () => {
           modal.style.display = 'flex'; // 모달을 보이게 함
       });



       // 모달 배경 클릭 시 모달 닫기
       window.addEventListener('click', (event) => {
           if (event.target === modal) {
               modal.style.display = 'none'; // 모달을 숨김
           }
       });

       document.addEventListener('DOMContentLoaded', () => {
        const smallMan = document.getElementById('small-man');
        const modal = document.getElementById('myModal');
    
        function updateModalPosition() {
            // small-man 요소의 위치와 크기를 가져옵니다.
            const rect = smallMan.getBoundingClientRect();
    
            // 모달 위치를 이미지 좌측 기준으로 설정합니다.
            modal.style.top = `${rect.bottom + window.scrollY}px`; // 이미지 하단 위치 + 페이지 스크롤
            modal.style.left = `${rect.left + 140}px`; // 이미지 좌측 기준
        }
    
        // 모달 열기 버튼 클릭 시
        document.getElementById('small-man').addEventListener('click', () => {
            modal.style.display = 'flex'; // 모달 보이기
            updateModalPosition(); // 위치 업데이트
        });
    
        // 모달 닫기 버튼 클릭 시
        document.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none'; // 모달 숨기기
        });
    
        // 윈도우 리사이즈 시 모달 위치 업데이트
        window.addEventListener('resize', updateModalPosition);
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        // small-man 요소와 모달을 가져옴
        const smallMan = document.querySelector('.small-man');
        const modal = document.querySelector('.modal');
    
        // 드래그 중 상태를 추적하는 변수
        let isDragging = false;
        let offsetX, offsetY;
    
        // small-man 요소에 mousedown 이벤트 리스너 추가
        smallMan.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - smallMan.getBoundingClientRect().left;
            offsetY = event.clientY - smallMan.getBoundingClientRect().top;
            document.body.style.cursor = 'move';
        });
    
        // 전역적으로 mousemove 이벤트 리스너 추가
        document.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const newX = event.clientX - offsetX;
                const newY = event.clientY - offsetY;
                
                // small-man 요소 이동
                smallMan.style.position = 'absolute';
                smallMan.style.left = `${newX}px`;
                smallMan.style.top = `${newY}px`;
                
                // modal 위치 업데이트 (small-man을 기준으로 조정)
                modal.style.position = 'absolute';
                modal.style.left = `${newX + 50}px`; // small-man의 오른쪽에 배치 (예시)
                modal.style.top = `${newY}px`;
            }
        });
    
        // mouseup 이벤트 리스너 추가
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default';
            }
        });
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        var icon = document.querySelector('.icon');
        var h5 = document.querySelector('.script h5');
        var closeButton = document.querySelector('.close-btn');
    
        // h5와 closeButton의 초기 상태 설정
        h5.classList.add('hidden');
        closeButton.style.display = 'none';
    
        icon.addEventListener('click', function() {
            if (h5.classList.contains('hidden')) {
                h5.classList.remove('hidden'); // h5를 보이도록 설정
                closeButton.style.display = 'block'; // 닫기 버튼을 보이도록 설정
            }
        });
    
        closeButton.addEventListener('click', function() {
            h5.classList.add('hidden'); // h5를 숨기도록 설정
            closeButton.style.display = 'none'; // 닫기 버튼을 숨기도록 설정
        });
    });
    