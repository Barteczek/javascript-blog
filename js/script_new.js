{
'use strict';

const generateArticleList = function() {

  const articles = document.querySelectorAll('.post');

  let listHtml = '';

  for(let article of articles){
    const title = article.querySelector('.post-title').innerText;
    const id = article.getAttribute('id');

    const articleLink = '<li><a href="#' + id + '">' + title + '</a></li>';
    console.log(articleLink);
    
    listHtml = listHtml + articleLink;
    
  }
  
  document.querySelector('.titles').innerHTML = listHtml;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', handleLinkClicked);
  }
}

const handleLinkClicked = function(event){
  event.preventDefault();
  
  const articles = document.querySelectorAll('.post');
  const linkHref = event.target.getAttribute('href'); 

  for(let article of articles){
    article.classList.remove('active');
  }

  document.querySelector(linkHref).classList.add('active');
  
}

generateArticleList();






}