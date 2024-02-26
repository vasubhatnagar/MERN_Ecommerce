class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }:{};
        this.query = this.query.find({...keyword});
        console.log(keyword);
        return this;
    }

    filter(){
        const duplicateQueryString = {...this.queryStr};
        const removeQueryItemsArr = ["keyword", "page", "limit"];
        console.log(duplicateQueryString);
        removeQueryItemsArr.forEach((key)=>{
            delete duplicateQueryString[key];
        });

        //Filter for price

        let queryStr = JSON.stringify(duplicateQueryString);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) =>`$${key}`);
        console.log("OBJECT ::"+queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(pageCount){
        const currPage = (this.queryStr.page)? this.queryStr.page:1;
        const skip = pageCount * (currPage -1);
        this.query = this.query.limit(pageCount).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;