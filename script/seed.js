'use strict'

const db = require('../server/db')
const {
  Category,
  Order,
  OrderDetail,
  Product,
  User,
  Address
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // USERS
  const jason = await User.create({
    email: 'jason@email.com',
    password: '1234567890',
    firstName: 'Jason',
    lastName: 'Cho',
    isAdmin: false
  })

  const sri = await User.create({
    email: 'sri@email.com',
    password: '0123456789',
    firstName: 'Sri',
    lastName: 'Velagapudi',
    isAdmin: false
  })

  // ADDRESSES
  const jasonAddress = await Address.create({
    city: 'New York',
    state: 'NY',
    zipcode: '12345',
    address: '123 Hanover St',
    userId: jason.id
  })

  const sriAddress = await Address.create({
    city: 'Hoboken',
    state: 'NJ',
    zipcode: '03456',
    address: '134 Hoboken St',
    userId: sri.id
  })

  const sriAddress2 = await Address.create({
    city: 'Princeton',
    state: 'NJ',
    zipcode: '08540',
    address: '134 Princeton Dr',
    userId: sri.id
  })

  // PRODUCT CATEGORIES
  const categoryMoney = await Category.create({name: 'Free Money'})
  const categoryTech = await Category.create({name: 'Tech Dreams'})
  const categorySuper = await Category.create({name: 'SuperPowers'})
  const categoryVacations = await Category.create({name: 'Vacations'})
  const categoryRandom = await Category.create({name: 'Random'})

  // PRODUCTS
  const lottoDream = await Product.create({
    sku: 'fm-lotto01',
    name: 'Winning the Lottery',
    price: 4000,
    description: 'Winning the Lottery with a Jackpot of 4 million dollars.',
    imageUrl:
      'https://www.ialottery.com/images/game-logos/megamillions-large.gif',
    categoryId: categoryMoney.id
  })

  const spideyDream = await Product.create({
    sku: 'sp-spider01',
    name: 'Being Spider-Man',
    price: 5000,
    description:
      'You are Spider-Man swinging around the city and then stopping a robbery in progress.',
    imageUrl:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP9000-CUSA02299_00-MARVELSSPIDERMAN/1559925379000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
    categoryId: categorySuper.id
  })

  const googleDream = await Product.create({
    sku: 'td-google01',
    name: 'Being senior programmer in Google',
    price: 4000,
    description:
      'You are a senior programmer in Google making bucket loads of money and making lots of cool products that everyone loves.',
    imageUrl: 'https://image.flaticon.com/teams/slug/google.jpg',
    categoryId: categoryTech.id
  })

  const moretonIslandDream = await Product.create({
    sku: 'v-aus01',
    name: 'Trip to Moreton Island',
    price: 4000,
    description: 'Relaxing trip to Moreton Island. Dream includes snorkeling, ',
    imageUrl:
      'https://www.ialottery.com/images/game-logos/megamillions-large.gif',
    categoryId: categoryVacations.id
  })

  // ORDER
  const jasonOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.08875,
    shippingAmt: 0,
    totalAmt: 0,
    userId: jason.id
  })

  const sriOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.06625,
    shippingAmt: 0,
    totalAmt: 0,
    userId: sri.id
  })

  const sriOrder2 = await Order.create({
    merchantAmt: 0,
    tax: 0.06625,
    shippingAmt: 0,
    totalAmt: 0,
    userId: sri.id
  })

  // ORDER DETAILS
  const jasonOrderLotto = await OrderDetail.create({
    itemUnitAmt: 40,
    itemQty: 2,
    orderId: jasonOrder.id,
    productId: lottoDream.id
  })

  const jasonOrderSpidey = await OrderDetail.create({
    itemUnitAmt: 50,
    itemQty: 1,
    orderId: jasonOrder.id,
    productId: spideyDream.id
  })

  const sriOrderLotto = await OrderDetail.create({
    itemUnitAmt: 40,
    itemQty: 1,
    orderId: sriOrder.id,
    productId: lottoDream.id
  })

  const sriOrderGoogle = await OrderDetail.create({
    itemUnitAmt: 50,
    itemQty: 1,
    orderId: sriOrder.id,
    productId: googleDream.id
  })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
