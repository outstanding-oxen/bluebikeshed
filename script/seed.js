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
    isAdmin: true
  })

  const sri = await User.create({
    email: 'sri@email.com',
    password: '0123456789',
    firstName: 'Sri',
    lastName: 'Velagapudi',
    isAdmin: true
  })

  const thomas = await User.create({
    email: 'thomas@email.com',
    password: 'hunter2345',
    firstName: 'Thomas',
    lastName: 'Luo',
    isAdmin: true
  })

  const ruslan = await User.create({
    email: 'ruslan@email.com',
    password: '0123456789',
    firstName: 'Ruslan',
    lastName: 'Zyabbarov',
    isAdmin: true
  })

  const hari = await User.create({
    email: 'hari@email.com',
    password: '0123456789',
    firstName: 'Hari',
    lastName: 'Doshi',
    isAdmin: false
  })

  const alex = await User.create({
    email: 'alex@email.com',
    password: '0123456789',
    firstName: 'Alex',
    lastName: 'Mok'
  })

  const terence = await User.create({
    email: 'terence@email.com',
    password: '0123456789',
    firstName: 'Terence',
    lastName: 'Helsel',
    isAdmin: false
  })

  const daniel = await User.create({
    email: 'daniel@email.com',
    password: '0123456789',
    firstName: 'Daniel',
    lastName: 'Wasserman'
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
  const careerDream = await Category.create({name: 'Career Dreams'})
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

  const moneyPoolDream = await Product.create({
    sku: 'fm-lotto01',
    name: 'Winning the Lottery',
    price: 4000,
    description: 'Literally swim in a pool of money.',
    imageUrl: 'WILLUPDATE.jpg',
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

  const superDream = await Product.create({
    sku: 'sp-super01',
    name: 'Being Super human!',
    price: 5000,
    description:
      'Become the strongest most overpowered hero of all time. Fly at the speed of light, move planets the size of Jupiter.',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categorySuper.id
  })

  const starFireDream = await Product.create({
    sku: 'sp-super02',
    name: 'Being Star Fire',
    price: 5000,
    description:
      'Fly at super sonic speeds, blast enemies with lasers. No one can stop you.',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categorySuper.id
  })

  const giantRobotDream = await Product.create({
    sku: 'sp-super02',
    name: 'Giant Robot pilot',
    price: 5000,
    description:
      'Pilot a giant mech and literally tackle giant monsters. Get in the robot.',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categorySuper.id
  })

  const googleDream = await Product.create({
    sku: 'cd-google01',
    name: 'Being senior programmer in Google',
    price: 4000,
    description:
      'You are a senior programmer in Google making bucket loads of money and making lots of cool products that everyone loves.',
    imageUrl: 'https://image.flaticon.com/teams/slug/google.jpg',
    categoryId: careerDream.id
  })

  const techStartUpDream = await Product.create({
    sku: 'cd-startUp01',
    name: 'Being senior programmer in a Start up',
    price: 4000,
    description:
      'Tired of working on small parts of a larger product? Start up is for you! Design the schema, make huge contributions, your ideas will lead the way for the start up',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const lawyerDream = await Product.create({
    sku: 'cd-aceAttorney01',
    name: 'Ace attorney in important Judge Case',
    price: 4000,
    description:
      'Objection! Your honor my client is innocent, I present to you dream A. With this dream you can live out your fantasies of being in a court case drama!',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const physicistsDream = await Product.create({
    sku: 'cd-physics01',
    name: 'Discover new laws of physics in this new world',
    price: 4000,
    description:
      'Discover new laws and phenomenons and push the boundaries of human knowledge in this dream. From the macro scale of supernovas to the microscopic world of quantum mechanics!',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const esportsDream = await Product.create({
    sku: 'cd-esports01',
    name: "You're the main carry in this game of League of Legends",
    price: 4000,
    description:
      "It's down to the wire at game 5. The enemy team won the first two, but you guys are coming back with 2 of your own. Compete and make the ultimate comeback in this dream!",
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const proAtheleteDream = await Product.create({
    sku: 'cd-basketball01',
    name: 'e',
    price: 4000,
    description: 'Ball is life.',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const wallStreetDream = await Product.create({
    sku: 'cd-stockbroker01',
    name: 'Stock broker in Wolf of WallStreet',
    price: 4000,
    description:
      'We did a collab with Christopher Nolan to bring this dream. Relive the crazy life of Jordan Belfort. Warning: Drugs in dreams may lead to real life addiction. Please use responsibly.',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: careerDream.id
  })

  const moretonIslandDream = await Product.create({
    sku: 'v-aus01',
    name: 'Trip to Moreton Island',
    price: 70000,
    description:
      'Relaxing trip to Moreton Island. Dream includes snorkeling, paddling, sandsurfing. Food included in dream. ',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categoryVacations.id
  })

  const bondiBeachDream = await Product.create({
    sku: 'v-aus02',
    name: 'Trip to Bondi Beach',
    price: 10000,
    description:
      'Beautiful day at Bondi beach. Activities include surfing, swimming, suntanning and relaxing, beach volleyball. Near Sydney if you get bored. ',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categoryVacations.id
  })

  const goldCoastDream = await Product.create({
    sku: 'v-aus03',
    name: 'Trip through the Gold Coast',
    price: 8000,
    description:
      'Take a scenic route through the beautiful Gold Coast of Australia! Breathtaking views, gorgeous sights to behold, you will not forget this experience! ',
    imageUrl: 'WILLUPDATE.jpg',
    categoryId: categoryVacations.id
  })

  // ORDER
  const jasonOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.08875,
    shippingAmt: 0,
    totalAmt: 0,
    userId: jason.id,
    isFulfilled: 'pending'
  })

  const sriOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.06625,
    shippingAmt: 0,
    totalAmt: 0,
    userId: sri.id,
    isFulfilled: 'completed'
  })

  const thomasOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.08875,
    shippingAmt: 0,
    totalAmt: 0,
    userId: thomas.id,
    isFulfilled: 'cancelled'
  })

  const hariOrder = await Order.create({
    merchantAmt: 0,
    tax: 0.06625,
    shippingAmt: 0,
    totalAmt: 0,
    userId: hari.id,
    isFulfilled: 'pending'
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
    orderId: thomasOrder.id,
    productId: lottoDream.id
  })

  const sriOrderGoogle = await OrderDetail.create({
    itemUnitAmt: 50,
    itemQty: 1,
    orderId: sriOrder.id,
    productId: googleDream.id
  })

  const thomasLayer = await OrderDetail.create({
    itemUnitAmt: 50,
    itemQty: 1,
    orderId: thomasOrder.id,
    productId: lawyerDream.id
  })

  const hariMoretonIsland = await OrderDetail.create({
    itemUnitAmt: 50,
    itemQty: 1,
    orderId: hariOrder.id,
    productId: moretonIslandDream.id
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
