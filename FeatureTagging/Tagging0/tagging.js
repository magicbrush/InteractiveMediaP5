let img;

function setup() {
  createCanvas(300, 300);
  img = loadImage('https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F98c5948e-0e78-4a36-a543-936d68467d61%2FAwe200.jpg?table=block&id=cfa8e40a-3586-4411-8ee6-f7dbdefeb796&spaceId=bab0e32c-deb9-46e9-ae55-1354ac2313f6&width=2000&userId=9733dda3-4e8b-4f74-a9bc-1e711f77efbd&cache=v2');
}

function draw() {
  image(img, mouseX, mouseY);
}