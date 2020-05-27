module.exports = controller = [
  { path: '/', source: './controller/index' },
  { path: '/login', source: './controller/login' },
  { path: '/register', source: './controller/register' },
  { path: '/se-deconnecter', source: './controller/deconnecter' },
  { path: '/utilisateur', source: './controller/compte' },
  { path: '/voyages', source: './controller/client/voyages' },
  { path: '/reservations', source: './controller/client/reservations' },
  { path: '/payments', source: './controller/client/payments' },
  { path: '/ticket', source: './controller/client/ticket' },

  { path: '/admin', source: './controller/admin/index' },
  { path: '/admin/utilisateurs', source: './controller/admin/utilisateurs' },
  { path: '/admin/stations', source: './controller/admin/stations' },

  { path: '/chefstation', source: './controller/chefstation/index' },
  { path: '/chefstation/vehicules', source: './controller/chefstation/vehicules' },
  { path: '/chefstation/voyages', source: './controller/chefstation/voyages' },
  { path: '/chefstation/reservations', source: './controller/chefstation/reservations' },
  { path: '/chefstation/notifications', source: './controller/chefstation/notifs' },

  { path: '/a-propos', source: './controller/apropos' },
  { path: '/contact', source: './controller/contact' },
  { path: '/pass-oublie', source: './controller/pass-oublie' },
  { path: '/utilisateur/notifications', source: './controller/client/notifs' }
]