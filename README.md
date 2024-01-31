# Originally forked from "Photo View" NuxtJS App

## Use as the Peer Prog QA Exercise

### To Set it Up

1. Clone the repo
2. Use node 16.20.2 since this is an old project (nvm helps)
3. Run `npm install`
4. Create a file at the root of the project called ".env" and paste these values into it:

```
NUXT_ENV_PORT=5000
NUXT_ENV_API_URL=http://localhost:5000/photo-resources-mock.json
```

5. Run `npm run dev` and test the url at "localhost:5000" in your browser
6. To run cypress tests run `npm run test:cypress`

Have fun!
