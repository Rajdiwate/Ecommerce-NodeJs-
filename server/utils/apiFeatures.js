class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query //Product.find()
        this.queryStr = queryStr // {keyword : }
        
    }

    //search specific products
    search() {
        const keyword = this.queryStr.keyword ? {  //if keyword exists then create a varaible "keyword" having property { name : { }}
            //ie. keyword = {
            //     name : {
            //         regex:,
            //         options:,
            //     }
            // }
            name: {
                $regex: this.queryStr.keyword,
                //to search all the documents which contains keyword. Eg. if the keyword is samosa then it will return all the documents containing samosa. eg "samosa" , "samosamosa" , etc

                $options: 'i'
                //for case insensitive . If the kwyword is ABC then it will still search for 'abc'

            }
        } : {} // else kewyord = {}  "empty object"

        this.query = this.query.find({ ...keyword }) // this.query return all docunments. .find({..keyword}) gets the documents containing keyword among all the documents
        return this;
    }

    //category and price filter 
    //keyword=> ?price[gt]=1200?price[lt]=2000   => { price: { gt: '1200', lt: '2000' } }
    filter() {
        // const queryCopy = this.queryStr will not create a copy because the object are pass by reference by default. To prevent his we will use the spread operator
        const queryCopy = { ...this.queryStr }

        //Removing some feilds for category
        const removeFeilds = ["keyword", "page", "limit"] // these feilds are not required while filtering category 

        removeFeilds.forEach(key => delete queryCopy[key]) // removing all the "removeFeilds" feilds from queryCopy


        //Filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)  //converting gt=>$gt and so on for effective mongodb querying


        this.query = this.query.find(JSON.parse(queryStr))  //example queryCopy =>   queryCopy = {category : "Laptop"}
        return this
    }

    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1

        const skip = (currentPage-1) * resultsPerPage
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this
    }
};

export { ApiFeatures }


