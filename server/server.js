const fs = require('fs');
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const ProdDB = [
    {
        id: 1,
        name: 'Knitted Sweater',
        category: 'Sweaters' ,
        price: 89 ,
        imageURL: 'https://www.shutterstock.com/image-photo/knitted-by-hand-blue-grey-mohair-645084376',
    },

    {
        id: 2,
        name: 'Leather Jacket',
        category: 'Jackets' ,
        price: 40 ,
        imageURL: 'https://www.istockphoto.com/photo/young-fashion-woman-in-black-leather-jacket-walking-in-city-street-gm939232454-256813555',
    },
    {
        id: 3,
        name: 'Beach Hat',
        category: 'Accessories' ,
        price: 50 ,
        imageURL: 'https://www.shutterstock.com/image-photo/top-view-yellow-striped-retro-hat-657860179',
    },


];
const resolvers = {
    Query: {
        productlist,
    },
    Mutation: {
        addprod,
    },

};

function productlist()
{
    return ProdDB;
}

function addprod( _, { product })
{
 product.id = ProdDB.length + 1;
 ProdDB.push(product);
 return product;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
 console.log('App started on port 3000');
});