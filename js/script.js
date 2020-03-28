{
  'use strict';

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorsSelector: '.post-author',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-' 
  };

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(opt.articleSelector + customSelector);


    /* for each article */
    let html = '';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */

      /* get the title from the title element */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into html variable */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){
    return {
      min: Math.min(...Object.values(tags)),
      max: Math.max(...Object.values(tags))
    };
  }

  function calculateTagClass(count, params){
    const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (opt.cloudClassCount - 1) + 1 );
    return opt.cloudClassPrefix + classNumber;
    
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagWrapper = article.querySelector(opt.articleTagsSelector);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      /* split tags into array */
      const dataTags = article.getAttribute('data-tags').split(' ');


      /* START LOOP: for each tag */
      for (let tag of dataTags) {

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this tag is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' </li> ';
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let tag of tagLinksActive) {
      /* remove class active */
      tag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagHref = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tag of tagHref) {
      /* add class active */
      tag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a, .tags a');
    /* START LOOP: for each link */
    for (let tag of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthors() {
    /* create variable allAuthors with empty object */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(opt.articleAuthorsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const dataAuthor = article.getAttribute('data-author');

      const dataAuthorHref = dataAuthor.replace(' ', '-').toLowerCase();

      /* generate HTML of the link */
      const linkHTML = '<a href="#author-' + dataAuthorHref + '">by ' + dataAuthor + '</a>';

      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this tag is NOT already in allTags */
      if(!allAuthors[dataAuthor]) {
        /* [NEW] add tag to allTags object */
        allAuthors[dataAuthor] = 1;
      } else {
        allAuthors[dataAuthor]++;
      }
      /* insert HTML of all the links into the tags wrapper */

      authorWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    console.log(allAuthors);
    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      console.log(author);
      allAuthorsHTML += '<li><a href="#author-' + author.replace(' ', '-').toLowerCase() + '">' + author + ' <span>(' + allAuthors[author] + ')</span></li> ';
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);
    /* find all author links with class active */
    const authorLinksActive = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for (let author of authorLinksActive) {
      /* remove class active */
      author.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorHref = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for (let author of authorHref) {
      /* add class active */
      author.classList.add('active');
      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + titleCase(author.replace('-', ' ')) + '"]');
    console.log(author.replace('-', ' ').toUpperCase());
  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-author a, .authors a');
    /* START LOOP: for each author */
    for (let author of authorLinks) {
      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }

  function titleCase(string) {
    let sentence = string.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  }


  addClickListenersToAuthors();
}