#  Resort List App
## Running the project

To generate the static html, js and css created from this project :  

```bash
npm i
npm run build

```
The files will be output into the ./out directory to be used elsewhere.
You can run the static files in a server like this:
```bash
npx serve@latest out  

```
Open [http://localhost:3000/resorts](http://localhost:3000/resorts) with your browser to see the result.  

##  Project To Do list
Should be able to pass an argument in for the source of the data json rather than having it hardcoded in the component.  
Complete component tests for ResortList and SortBar. -Need to fix mocking of useRouter.  
Create a loading screen.  
More user error messaging.  