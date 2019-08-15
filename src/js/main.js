"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

/*
##     ##    ###    ########  ####    ###    ########  ##       ########  ######
##     ##   ## ##   ##     ##  ##    ## ##   ##     ## ##       ##       ##    ##
##     ##  ##   ##  ##     ##  ##   ##   ##  ##     ## ##       ##       ##
##     ## ##     ## ########   ##  ##     ## ########  ##       ######    ######
 ##   ##  ######### ##   ##    ##  ######### ##     ## ##       ##             ##
  ## ##   ##     ## ##    ##   ##  ##     ## ##     ## ##       ##       ##    ##
   ###    ##     ## ##     ## #### ##     ## ########  ######## ########  ######
*/

const handleRepo = (repos) => {
  for (const repo of repos) {
    if (repo.description === null) {
      repo.description = "No description"
    }
    const updateTime = repo.updated_at.slice(0,10).split("-").reverse().join("-");

    const repoProjects = document.querySelector('.projects__repos--js');
    console.log(repo);

    repoProjects.innerHTML += `
    <section class="repo">
      <header class="repo__header">
        <img src="assets/svg/github-icon.svg" alt="github icon" class="repo__icon">
        <h3 class="repo__heading repo__heading--js">
          ${repo.name}
        </h3>
        <p class="repo__description">
          ${repo.description}
        </p>
        <p class="repo__update">
          last update: ${updateTime}
        </p>
      </header>
      <nav class="repo__navigation">
        <ul class="repo__list">
          <li class="repo__item">
            <a href="https://jchojna.github.io/${repo.name}" class="repo__link" target="_blank>
              <svg class="repo__svg">
                <use href="assets/svg/sprite-map.svg#link-demo">
              </svg>
              <span class="repo__label">Demo</span>
            </a>
          </li>
          <li class="repo__item">
            <a href="${repo.html_url}" class="repo__link" target="_blank>
              <svg class="repo__svg">
                <use href="assets/svg/sprite-map.svg#link-github">
              </svg>
              <span class="repo__label">Github</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
    `
  }
}

fetch("https://api.github.com/users/jchojna/repos?sort=updated")
  .then(resp => resp.json())
  .then(resp => handleRepo(resp));