class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "keyword",
      "searchTerms",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    Object.keys(queryObj).forEach((el) => {
      if (queryObj[el].in) {
        queryObj[el].in = queryObj[el].in.split(",");
      }

      return (
        (queryObj[el] === "" || queryObj[el].in === "") && delete queryObj[el]
      );
    });

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|ne|eq|in)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    this.query = this.query.sort("_id");

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }
}

module.exports = APIFeatures;
