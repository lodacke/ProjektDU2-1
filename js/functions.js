
// G
// CODE According to specification
function click_filter_element (event) {

  event.currentTarget.classList.toggle("selected");

  update_programmes();
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
}

// G
// CODE according to specification

function create_filter_element (data) {
  const button = document.querySelector("button");
  document.querySelector("button").addEventListener("click", toggle_cities);
  button.classList.add(data.class);
  const create_li = document.createElement("li");
  data.parent.append(create_li);
  create_li.classList.add(data.class);
  create_li.textContent = data.textContent;
  create_li.addEventListener("click", click_filter_element);

  return create_li;
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  
}


// VG
// CODE according to specifications
function toggle_cities (event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE
    

  */
    let all_cities = document.querySelectorAll("#country_filter li");
    const button = document.querySelector("button");
    button.classList.toggle("selected");

    function toggle_selected(city){

    if (button.classList !== ("selected")){
      city.classList.toggle("selected");

      update_programmes();
      }
    
 }
 array_each(all_cities, toggle_selected)

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city


/*
  SPECIFICATION create_country_cities_filters:
  argument: Funktionen tar inte emot någora argument. 
  side-effect: När funktionen anropas anropas även de två funktioner som finns i create_country_city_filter, 
  (create_country & create_city) med array_each.

  funtionen returnerar ingenting.
  
  
  SPECIFICATIONS create_country:

  arguments: funktionen tar emot ett argument (country), som är en variabel som representerar varje index i array COUNTRIES.
  side-effect: funktionen skapar en div med klasserna "country" och "filter_container", 
  samt ger den ett id från arrayen (country + nycklen, med namn "id", från arrayen).
  - Den ger DOM-elementet en titel av indexet "name" i arrayen, samt skapar en ul med klassen "filter_list".
  - Den appendar DOM-elementet till country_filter > ul.
  - Funktionen anropar test_function som ger en array med alla städer som har samma countryID som cityID.

  funktionen returnerar ingenting.

  SPECIFICATIONS create_city:
  arguments: Funktionen tar emot ett argument (city) som är en variabel som representar ett index i array cities(en array om skapas i testfunktionen i create_country.).
  side-effects: funktionen skapar ett objekt som kopplas till funktionen create_filter_elements.
  Objektet har nycklarna: 
  - parent(som hänvisar till vilken plats i HTML dokumentet informationen ska visas), 
  - class(vilken klass nyckeln ska ha), 
 -  textContent (variabeln med nyckel "name"). 

  Funktionen ger även objektet ett data_id med ett namn baserat på variablens namn.

 */

function create_countries_cities_filters () {
  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

/*SPECIFICATIONS create_filter
arguments: Funktionen tar emot två funktioner, en sträng och en array.
Funktionen anropar array_each med argumentet DATA och den inre funktionen "create".
side-effect: Funktionen skapar via funktionen "create" ett objekt kopplat till funktionen "create_filter_elements" med nycklarna:
Parent: Väljer ul element på HTML sidan med "filter_type" och filter som id.
Class: "selected"
TextContent: variabeln DATA och nycklen name.
Funktionen ger även varje variabel ett data-id baserat på variabeln DATA.
*/


function create_filter(filter_type, DATA) {
  function create(data) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${filter_type}_filter > ul`),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(DATA, create);
}
create_filter("level", LEVELS);
create_filter("subject", SUBJECTS);
create_filter("language", LANGUAGES);


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  
 document.querySelector("#programmes > p").innerHTML = "";
     
    let programme_dom = document.createElement("li");
    programme_dom.classList.add("programme");
    programme_dom.textContent = programme.name;
    document.querySelector("#programmes > ul").append(programme_dom);

    let sun_value = CITIES[UNIVERSITIES[programme.universityID].cityID].sun;

    programme_dom.innerHTML = `
    <div> ${programme.name} 
    <p> ${UNIVERSITIES[programme.universityID].name}
    <p> ${CITIES[UNIVERSITIES[programme.universityID].cityID].name},
     ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name} </p>
     <p> ${LEVELS[programme.levelID -1].name},
         ${SUBJECTS[programme.subjectID].name},
         ${LANGUAGES[programme.languageID].name} </p>
    </div>
    <div class="more_info"> </div>
    <div class="bottom_programme">
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, 
    sun-index: (${percenter(sun_value, 365) + "%"})
    </p> 
    </div>
    `
    
}
array_each(PROGRAMMES, create_programme);


// G
// CODE according to the specification
function update_programmes () {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

      let p_in_container = document.querySelector("#programmes > p");
      let programmes_before = document.querySelector("#programmes > ul");

      programmes_before.innerHTML = "";
      if (programmes_before.length !== 0){
        p_in_container.innerHTML = "Inga program upfyller nuvarande filter";
      }
       
      let selected_programme = read_filters();
      array_each(selected_programme, create_programme);
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

/*SPECIFICATIONS READ_FILERS:
ARGUMENTS: Funktionen tar inte emot några argument.
SIDE-EFFECTS: side_effects 
City

1.Vi börjar med att skapa en variabel som är en referens till en nodelist som är alla selekterade li i country_filter.
Vi anropar array_each med variabeln med nodelistan och en callback funktion. 
Detta generar en en array(a)med nodelitstan plus nycklarna ID för varje element översatta till en sträng. 

Universitet
2. loopar vi igenom alla element i arryen skapad i den tidigare funktionen och skapar en ny variabel av varje index i arrayen. 
Därefter loopar UNIVERSITIES igenom och en ny variabel skapas för varje index. 
Dessa två varaiblar jämförs med deras ”Id”.
Om dessa matchas pushas dom in i en ny array(b).

PROGRAMME
3. En tom array deklarerar (X).

array_each anropas med parametrarna array(b) och en callback funktion. 
I callbackfunktionen så skapas en ny variabel av varje index i och dess id. 
Därefter loopas PROGRAMMES och varje index blir en ny variabel(c). 
Om varje index av PROGRAMMES nyckel ”id”, matchar med tidigare etablerad variabel av array(b). 
Om funktionen returnerar true pushas c in i x.

4. Kommande tre funktioner gör samma sak men med olika värden. (LEVELS, LANGUAGES, SUBJECTS)

En ny variabel skapas med referens till en nodelist av selekterade li element från vardera förälder med namn baserat på de olika värden. (Z)

En tom array deklareras. (r)
Via array_each anropas  Z och callback-funktion. 
Callback funtion omvandlar varje index i Z’s nyckelns id till en sträng. 

X värde uppdateras genom array_filter som anropas med värdena x och test_funktionerna.
Test funktionen returnerar varje index från r om den inkluderar X.Z.’s id.

5. En variabel deklareras som är en referens till input-elements värde. (u)
Om variabelns värde är inte är tomt körs test function. 

Test function returnerar en ny array om index av X med nyckeln name inkluderas (u).
X värde uppdateras genom array_filter som anropas med värdena (X och test_function).

Funktionen returnerar X.


// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it

*/
function read_filters () {
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
