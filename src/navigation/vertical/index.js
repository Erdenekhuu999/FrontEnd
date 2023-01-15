import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import CarSports from 'mdi-material-ui/CarSports'

const navigation = () => {
  return [
    {
      title: 'Нүүр хуудас',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Хэрэглэгчийн хэсэг'
    },
    {
      title: 'Хэрэглэгчид',
      icon: AccountGroup,
      path: '/users'
    },
    {
      title: 'Машинууд',
      icon: CarSports,
      path: '/cars'
    },
    {
      title: 'Захиалгууд',
      icon: Table,
      path: '/bookings'
    },
  ]
}

export default navigation
