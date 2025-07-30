export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // MongoDB native query (e.g., collection.find())
    this.queryString = queryString; // req.query from Next.js
    this.pipeline = []; // Used for aggregation features like projection, sorting
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const mongoQuery = {};

    for (const key in queryObj) {
      if (typeof queryObj[key] === "object") continue;

      // Check for advanced query operators
      if (/\b(gte|gt|lte|lt)\b/.test(queryObj[key])) {
        try {
          const [operator, value] = queryObj[key].split(":");
          mongoQuery[key] = { [`$${operator}`]: Number(value) };
        } catch {
          mongoQuery[key] = queryObj[key];
        }
      } else {
        mongoQuery[key] = queryObj[key];
      }
    }

    this.query = this.query.filter(mongoQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      const sortObj = {};

      sortFields.split(" ").forEach((field) => {
        if (field.startsWith("-")) {
          sortObj[field.slice(1)] = -1;
        } else {
          sortObj[field] = 1;
        }
      });

      this.query = this.query.sort(sortObj);
    } else {
      this.query = this.query.sort({ createdAt: -1 });
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});
      this.query = this.query.project(fields);
    } else {
      this.query = this.query.project({ __v: 0 });
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
