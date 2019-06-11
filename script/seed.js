'use strict'

const db = require('../server/db')
const {
  Category,
  Order,
  OrderDetail,
  Product,
  Customer,
  Address,
  Cart
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const jason = await Customer.create({
    email: 'jason@email.com',
    password: '1234567890',
    firstName: 'Jason',
    lastName: 'Cho'
  })

  const jasonAddress = await Address.create({
    city: 'New York',
    state: 'NY',
    zipcode: 10002,
    address: '123 Hanover St',
    customerId: jason.id
  })

  const jasonOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.08875,
    shippingAmt: 0,
    totalAmt: 0,
    customerId: jason.id
  })

  const lottoDream = await Product.create({
    sku: 'mon-lotto01',
    name: 'Winning the Lottery',
    price: 40,
    description: 'Winning the Lottery with a Jackpot of 4 million dollars.',
    imageUrl:
      'https://www.ialottery.com/images/game-logos/megamillions-large.gif'
  })

  const spideyDream = await Product.create({
    sku: 'shspider01',
    name: 'Being Spider-Man',
    price: 50,
    description:
      'You are Spider-Man swinging around the city and then stopping a robbery in progress.',
    imageUrl:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP9000-CUSA02299_00-MARVELSSPIDERMAN/1559925379000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000'
  })

  const jasonOrderLotto = await OrderDetail.create({
    itemUnitAmt: 40,
    itemQty: 2,
    orderId: jasonOrder.id,
    productId: spideyDream.id
  })

  const category1 = await Category.create({name: 'Free Money'})
  const category2 = await Category.create({name: 'Tech Dreams'})
  const category3 = await Category.create({name: 'SuperPowers'})
  const category4 = await Category.create({name: 'Random'})

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
