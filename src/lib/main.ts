document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu') as HTMLElement
  const menuButton = document.querySelector('#menu-button') as HTMLButtonElement

  function toggleMenu() {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
    menu.setAttribute('data-open', isOpen ? 'false' : 'true')
  }

  menuButton.addEventListener('click', () => {
    toggleMenu()
  })
})
