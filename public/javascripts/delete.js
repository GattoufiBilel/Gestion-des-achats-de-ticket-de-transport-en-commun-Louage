var btnDel = document.querySelectorAll('.btn-delete')
btnDel.forEach(b => {
  b.onclick = (e) => {
    e.stopPropagation()
    swal({
      title: "Voulez-vous vraiment supprimer?",
      text: "Une fois vous cliquez supprimer, vous ne pourrez plus le récupérer.",
      icon: "warning",
      buttons: ['non', 'oui'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(b.getAttribute("href"))
            .then(r => { window.location.reload() })
            .catch(e => { })
        } else { swal("Suppression annulée!"); }
      })
    return false
  }
})

var btnCancel = document.querySelectorAll('.btn-cancel')
btnCancel.forEach(b => {
  b.onclick = (e) => {
    e.stopPropagation()
    swal({
      title: "Voulez-vous vraiment annuler?",
      text: "Une fois vous cliquez annuler, votre reservation sera annulée.",
      icon: "warning",
      buttons: ['non', 'oui'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(b.getAttribute("href"))
            .then(r => { window.location.reload() })
            .catch(e => { })
        }
      })
    return false
  }
})