var food = [
  {
    name: "Can eat",
    can: 0,
    items: [
      {
        name: "Apple",
        subtitle: "Not core",
        tags: [
          "fruit",
          "core",
        ],
        desc: "Apple slices make a delicious, healthy snack for your dog and can help keep your dog's teeth clean and their breath fresh. However, the core of the apple and the apple seeds especially can be harmful to dogs.",
        critic: "",
      },
      {
        name: "Banana",
        subtitle: "",
        tags: [
          "peel",
          "fruit",
        ],
        desc: "Yes, dogs can have bananas. They may not get all the nutritional benefits humans get from this fruit, but bananas make a good-and motivating-treat. If you're wondering 'Can puppies eat bananas?', check with your veterinarian. ... Added calories from bananas and other fruits could interfere.",
        critic: "",
      },
      {
        name: "Beans",
        subtitle: "",
        tags: [
          "bean",
          "lentil",
          "baked",
        ],
        desc: "They are rich in fiber and have some protein, too. Dogs can have beans as a treat. That means they should never be more than 10 percent of your dog's daily calorie intake. Since beans can be high in calories, you should not be feeding him many.",
        critic: "Likes baked beans",
      },
      {
        name: "Blackberries",
        subtitle: "",
        tags: [
          "berry",
          "berrie",
          "black",
          "fruit",
        ],
        desc: "If you want to give your dog a sweet, healthy treat, there's good news. Blackberries are safe for dogs to eat. ... You can feed your dog strawberries, blueberries and raspberries as well. These berries are soft and easy for dogs to chew and don't contain any ingredients that are toxic to canines.",
        critic: "",
      },
      {
        name: "Blueberries",
        subtitle: "",
        tags: [
          "berry",
          "berrie",
          "black",
          "fruit",
        ],
        desc: "Yes, blueberries are a great low-calorie treat for dogs. They also contain antioxidants, fiber and vitamins C and K. These nutrients support the immune system and contribute to overall health. Adding blueberries to your dog's diet is a great way to help keep him happy and healthy.",
        critic: "Likes blueberries",
      },
      {
        name: "Bread",
        subtitle: "",
        tags: [
          "dough",
          "gluten",
          "loaf",
        ],
        desc: "The short answer to the question 'can dogs eat bread?' is yes. Dogs can safely eat bread in much the same way as humans-in moderation. Plain white and wheat bread is generally safe for dogs to eat, provided they don't have any allergies, and it usually does not cause any stomach upset.",
        critic: "Likes bread a little bit",
      },
      {
        name: "Broccoli",
        subtitle: "",
        tags: [
          "brocoli",
          "brocolli",
          "broccolli",
          "vege",
        ],
        desc: "Yes, dogs can eat broccoli. Dogs can eat both cooked and raw broccoli, as long as there are no seasonings or oils added. However, this vegetable should always be given in very small quantities, especially because the florets contain isothiocyanates, which can cause gastric irritation in dogs.",
        critic: "Does not really care for broccoli",
      },
      {
        name: "Cabbage",
        subtitle: "",
        tags: [
          "vege",
          "lettuce",
          "leaf",
        ],
        desc: "Cabbage is also safe for dogs, but comes with the same gassy warning! Yes, dogs can eat carrots. Carrots are an excellent low-calorie snack that is high in fiber and beta-carotene, which produces vitamin A. Plus, crunching on this orange veggie is great for your dog's teeth (and fun).",
      },
      {
        name: "Carrots",
        subtitle: "Small pieces",
        tags: [
          "root",
          "vege",
        ],
        desc: "Like many other fruits and vegetables, dogs can have carrots. In fact, every part of this vegetable, from the carrot itself to the leafy green tops are safe for dogs to eat.",
        critic: "Doesn't really like carrots",
      },
      {
        name: "Celery",
        subtitle: "Leaves with caution & small pieces",
        tags: [
          "vege",
        ],
        desc: "In general, celery is considered to be a safe food for dogs. However, there are some minor caveats. For example, it may pose a choking hazard to young or small dogs, so it's important to cut it into small-enough pieces before you share it with them.",
        critic: "Likes celery a little bit. Likes to play with it",
      },
      {
        name: "Chicken",
        subtitle: "Cooked, without bones",
        tags: [
          "poultry",
          "meat",
        ],
        desc: "Considering how many dog foods contain chicken as an ingredient, it's a safe bet that you can feed your dog chicken. In fact, it's a good source of protein, and cooked chicken can even be substituted for or added to his regular meal.",
        critic: "Loves chicken",
      },
      {
        name: "Chickpea",
        subtitle: "",
        tags: [
          "bean",
          "hommus",
          "falafel",
        ],
        desc: "Garbanzo beans, also known as chickpeas, are among the beans that are safe for dogs, as long as they are cooked plainly. Do not, under any circumstances, give your dog chickpeas with onion or garlic, and avoid giving them hummus as it can be processed with ingredients that are toxic to dogs like garlic and lemon juice.",
      },
      {
        name: "Coconut",
        subtitle: "",
        tags: [
          "fruit",
        ],
        desc: "When ingested in small amounts, coconut and coconut-based products are not likely to cause serious harm to your pet. The flesh and milk of fresh coconuts do contain oils that may cause stomach upset, loose stools or diarrhea. Because of this, we encourage you to use caution when offering your pets these foods.",
      },
      {
        name: "Corn",
        subtitle: "Not the cob",
        tags: [
          "vege",
        ],
        desc: "Is corn bad for dogs and just 'filler' in dog food? No, corn is not harmful to dogs and is certainly not a filler. In fact, it has nutritional benefits.",
      },
      {
        name: "Cucumbers",
        subtitle: "",
        tags: [
          "vege",
        ],
        desc: "Your dog can have a healthy snack of carrot sticks, green beans, cucumber slices, or zucchini slices. Even a plain baked potato is OK. Don't let your dog eat any raw potatoes or any potato plants from your pantry or garden.",
        critic: "Likes cucumbers somewhat but not the skin",
      },
      {
        name: "Eggs",
        subtitle: "Cooked",
        tags: [
          "chicken",
          "poultry",
        ],
        desc: "Are eggs good for dogs? Yes. Eggs are good for dogs to eat. Of course, they are rich in protein, but aside from that eggs are also a good source of linoleic acid and fat-soluble vitamins like Vitamin A.",
        critic: "Likes eggs a little bit",
      },
      {
        name: "Fish",
        subtitle: "",
        tags: [
          "tuna",
          "salmon",
          "seafood",
        ],
        desc: "Absolutely. There are many varieties of fish that are good for dogs. 'Tuna, salmon, whitefish, cod and whiting (also known as hank) are all good fish for dogs to eat,' says Dempsey. ... And fish isn't just healthy for dogs-they like the taste of fish, too. Skin is good for the coat too.",
        critic: "Loves fish including salmon",
      },
      {
        name: "Lentils",
        subtitle: "",
        tags: [
          "bean",
        ],
        desc: "Dogs will enjoy eating lentils in small or moderate amounts after they've been soaked and cooked without spices. Dogs can eat lentils: Mixed with a meat protein and vegetable for a homemade meal. Blended and incorporated into a smaller portion of your dog's store-bought food.",
      },
      {
        name: "Mango",
        subtitle: "",
        tags: [
          "fruit",
        ],
        desc: "Yes, dogs can eat mango. It's a sweet and tasty treat and the soft flesh is easy for dogs to eat. Like many other fruits and berries, mangos are a safe people food for your pup.",
        critic: "Does not like mango",
      },
      {
        name: "Meat",
        subtitle: "Pork, Beef, Turkey, ect",
        tags: [
          "pork",
          "beef",
          "turkey",
          "chicken",
          "lamb",
        ],
        desc: "Most dogs are fine eating lean cuts of meat that have been cooked well. Take off all visible fat -- including the skin on poultry. Be sure that there are no bones in the meat before you give it to your dog.",
        critic: "Loves meat obviously",
      },
      {
        name: "Oats / Oatmeal",
        subtitle: "",
        tags: [
          "oat",
        ],
        desc: "Generally, you can feed your dog one tablespoon of cooked oatmeal for every 20 pounds of his weight. Don't give your dog too much oatmeal at once because it contains a lot of carbohydrates and is relatively high in calories.",
        critic: "Likes a bit of oats",
      },
      {
        name: "Pancake",
        subtitle: "",
        tags: [
          "pankace",
        ],
        desc: "Plain pancakes in moderation are unlikely to harm your dog, although some pets have wheat allergies or sensitivities to grains. However, leftover pancakes with toppings added—including sweets like syrup—are less healthy for dogs, and should generally be avoided.",
        critic: "Loves Pancakes, but not with maple syrup",
      },
      {
        name: "Pasta",
        subtitle: "Cooked",
        tags: [
          "spaghetti",
          "noodles",
        ],
        desc: "Dogs can eat plain white rice or pasta after it's cooked. And, a serving of plain white rice with some boiled chicken can sometimes make your dog feel better when they are having stomach problems.",
        critic: "Likes a bit of cooked pasta",
      },
      {
        name: "Peanut butter",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "Yes, dogs can eat peanut butter as long as it is fed in moderation and does not contain xylitol, so get out that peanut butter jar and share the good news.",
        critic: "Likes peanut butter, but not too much",
      },
      {
        name: "Peas",
        subtitle: "",
        tags: [
          "pea",
          "bean",
          "vege",
        ],
        desc: "Yes, dogs can eat peas. Green peas, snow peas, sugar snap peas, and garden or English peas are all OK for dogs to find in their bowl on occasion. Peas have several vitamins, minerals, and are rich in protein and high in fiber. You can feed your dog fresh or frozen peas, but avoid canned peas with added sodium.",
      },
      {
        name: "Popcorn",
        subtitle: "",
        tags: [
          "corn",
          "vege",
        ],
        desc: "Yes and no. Plain, air-popped popcorn is safe for dogs to eat in small quantities. Buttered popcorn or popcorn with other toppings is not safe for your dog on a regular basis, although eating a few dropped pieces here and there probably won't hurt him. Try not to give them hard pieces.",
        critic: "Loves popcorn",
      },
      {
        name: "Potato",
        subtitle: "",
        tags: [
          "root",
          "vege",
        ],
        desc: "Your dog can have a healthy snack of carrot sticks, green beans, cucumber slices, or zucchini slices. Even a plain baked potato is OK. Don't let your dog eat any raw potatoes or any potato plants from your pantry or garden.",
      },
      {
        name: "Prawns",
        subtitle: "Cooked",
        tags: [
          "shrimp",
          "prawn",
          "seafood",
        ],
        desc: "Yes, dogs can eat prawns provided they are cooked and peeled. Don't feed your dog whole prawns with the shell on, and never feed them raw prawns that haven't been frozen. ... However, you should always feed seafood to your pooch in moderation and introduce any new foods, even treats, slowly into your dog's diet.",
        critic: "Like prawn meat",
      },
      {
        name: "Pumpkin",
        subtitle: "Flesh or seeds",
        tags: [
          "vege",
        ],
        desc: "Pumpkin. Dogs will eat almost anything, so a pumpkin isn't out of the question, particularly since tiny pumpkins and gourds may resemble a toy or ball. ... Lobos, 'Canned pumpkin (NOT canned pumpkin pie mix, which contains sugar and spices) is a fabulous source of fiber and can even help with digestive upset.",
        critit: "Doesn't really like cooked pumpkin",
      },
      {
        name: "Quinoa",
        subtitle: "",
        tags: [
          "",
        ],
        desc: "But, can dogs eat quinoa? The answer is generally yes. The edible seed is actually an ingredient in some high-quality dry dog foods. Its strong nutritional profile makes it a healthy alternative to corn, wheat, and soy - starches that are often used to make kibble.",
      },
      {
        name: "Rice",
        subtitle: "Cooked",
        tags: [
          "sushi",
          "grain",
        ],
        desc: "Safe: Cooked White Rice and Pasta. Dogs can eat plain white rice or pasta after it's cooked. And, a serving of plain white rice with some boiled chicken can sometimes make your dog feel better when they are having stomach problems.",
        critic: "Likes rice.",
      },
      {
        name: "Seaweed",
        subtitle: "",
        tags: [
          "seafood",
          "sushi",
          "nori",
        ],
        desc: "All seaweed strains are considered edible for dogs, but you do want to be careful how you feed it to your dog. Processed seaweed such as nori is fine in small amounts, but most sources recommend ground seaweed as the preferred way to add it to your dog's diet.",
        critic: "Likes sushi seaweed sort of",
      },
      {
        name: "Strawberries",
        subtitle: "",
        tags: [
          "strawberry",
          "berry",
          "berries",
          "fruit",
        ],
        desc: "Strawberries are good for dogs. But feed strawberries to your dog like you would any other snack. Keep the portion size small.",
      },
      {
        name: "Sweet Potato",
        subtitle: "Not skin",
        tags: [
          "vege",
          "root",
        ],
        desc: "When feeding your dog a sweet potato, make sure it's cooked and that the skin is removed; leaving the skin on makes it harder for your dog to digest. You should never feed your dog a raw sweet potato. Not only are they difficult to chew, but they can upset your dog's stomach and potentially cause intestinal blockage.",
      },
      {
        name: "Watermelon",
        subtitle: "Flesh only: no seeds or rind",
        tags: [
          "melon",
          "fruit",
        ],
        desc: "But is it safe for them to eat? The answer is yes, with a couple of precautions. Seeds could cause an intestinal blockage, so make sure you remove them. It's also probably not a good idea to allow a dog to chew on the rind, because it can cause gastrointestinal upset.",
      },
      {
        name: "Yogurt",
        subtitle: "",
        tags: [
          "",
        ],
        desc: "Yes, dogs can eat yogurt. It contains calcium and protein-plus, it's tasty! Make sure it does not contain xylitol",
        critic: "Loves greek yogurt",
      },
    ],
  },
  {
    name: "Limit / Caution",
    can: 1,
    items: [
      {
        name: "Capsicum",
        subtitle: "",
        tags: [
          "pepper",
          "vege",
        ],
        desc: "Can dogs eat capsicum? Yes, a small amount. ... Most spicy food doesn't sit well with a dog's digestive system. A mild, small piece of capsicum is fine, but the whole fruit can cause diarrhoea or an upset stomach.",
      },
      {
        name: "Cashews",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "Can my dog eat cashew nuts? Yes, cashews are generally safe for dogs to eat. Unlike macadamia nuts, cashews are not toxic to dogs.",
        critic: "Likes cashews",
      },
      {
        name: "Cereal",
        subtitle: "",
        tags: [
          "wheat",
          "cereal",
          "wheaties",
          "weetbix",
        ],
        desc: "The answer overall is yes, dogs can eat some cereal, but much like for us humans, there are several types that are less healthy than others for dogs. ... While dogs can eat many types of cereal, they should only have it as an occasional treat. Cereal should also never replace the food you feed your dog as their main diet.",
        critic: "Loves WeetBix",
      },
      {
        name: "Cheese",
        subtitle: "",
        tags: [
          "dairy",
          "chedder",
          "milk",
        ],
        desc: "While cheese can be safe to feed to your dog, there are some things to remember. Cheese is high in fat, and feeding too much to your dog regularly can cause weight gain and lead to obesity. Even more problematic, it could lead to pancreatitis, a serious and potentially fatal illness in dogs.",
        critic: "Loves cheese",
      },
      {
        name: "Cherries",
        subtitle: "Flesh only",
        tags: [
          "berry",
          "berries",
          "fruit",
        ],
        desc: "The flesh of a cherry is safe for dogs to eat. Cherries contain vitamins A and C, fiber and antioxidants, which are good for dogs. ... This is toxic to dogs if ingested in large enough quantities. A single cherry pit and stem often isn't enough to cause cyanide poisoning, but there's no reason to take the risk.",
        critic: "Does not like cherries",
      },
      {
        name: "Ginger",
        subtitle: "",
        tags: [
          "root",
          "vege",
          "pickled",
        ],
        desc: "Ginger is safe for your dog to eat in small doses. It contains many antioxidants that can support dogs with motion sickness, blood circulation, nausea, gastrointestinal problems, and bloat. Ginger is anti-inflammatory and also help dogs with arthritis.",
        critic: "Likes pickled ginger (in sushi) a little bit",
      },
      {
        name: "Honey",
        subtitle: "",
        tags: [
          "bee",
        ],
        desc: "Honey is safe for dogs to eat in small quantities. ... Sugars can also cause tooth decay, so it might be a good idea to brush your dog's teeth if you do feed him honey. Raw honey should not be fed to puppies or dogs with compromised immune systems, as it may contain the presence of botulism spores.",
      },
      {
        name: "Hummus",
        subtitle: "",
        tags: [
          "chickpea",
          "hommus",
        ],
        desc: "It's always better to be safe than sorry, hence, you can enjoy your hummus the way you want it to, giving the dog-friendly one to your furry friend. As long as there isn't any garlic in it, it is absolutely safe. To be on the safer side, have them taste a little of it first and observe them",
      },
      {
        name: "Milk",
        subtitle: "",
        tags: [
          "dairy",
        ],
        desc: "Milk is a safe treat in small quantities. A few tablespoons of cow's milk or goat's milk on an occasional basis can be a nice reward for your dog without the side effects of overindulgence.",
      },
      {
        name: "Mushrooms",
        subtitle: "",
        tags: [
          "fungi",
          "fungus",
          "vege",
        ],
        desc: "Mushrooms sold in large and chain grocery stores are generally safe for dogs to eat. However, we rarely serve up plain mushrooms. ... Unless the mushroom is served plain, it is generally safer to avoid feeding dishes with mushrooms to dogs. Never give dogs wild mushrooms",
      },
      {
        name: "Nectarine",
        subtitle: "",
        tags: [
          "fruit",
          "peach",
        ],
        desc: "Rich in vitamins A and C, magnesium, potassium, and dietary fiber, nectarines are a sweet and nutritious summer fruit.",
        critic: "Does not like nectarine",
      },
      {
        name: "Passionfruit",
        subtitle: "",
        tags: [
          "fruit",
        ],
        desc: "Now you know why the topic of passion fruit safety for dogs is a complicated one. In small, careful servings that contain no rind or seeds, ripe passion fruit is okay for your dog to eat.\nBut because it is a challenge to get rid of all of the seeds, it doesn't make for a convenient treat. That's why we recommend sticking with safer fruits for your dog.",
      },
      {
        name: "Peanuts",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "Dry-roasted (or raw), unsalted peanuts are the only peanuts that are actually safe for dogs to eat, although your dog will probably be fine if he manages to scoop up a salted peanut or two from the floor. ... Peanuts also contain high levels of fat.",
        critic: "Likes peanuts",
      },
      {
        name: "Pineapple",
        subtitle: "Not canned",
        tags: [
          "fruit",
        ],
        desc: "Yes. Raw pineapple, in small amounts, is an excellent snack for dogs. Canned pineapple, on the other hand, should be avoided. The syrup in canned fruits contains too much sugar for most dogs' digestive tracts to handle. A few chunks of raw pineapple are usually enough for most dogs, provided they are peeled and sliced into bite-sized pieces. Plus, frozen pieces of fresh pineapple make a delicious treat in the summer.",
        critic: "Likes peanuts",
      },
      {
        name: "Raw meat",
        subtitle: "",
        tags: [
          "",
        ],
        desc: "Yes, dogs can eat raw meat. Should dogs eat raw meat, though? Dr. RuthAnn Lobos, a Purina veterinarian, says feeding a diet consisting primarily of raw meat may not provide the complete and balanced nutrition your dog needs.",
        critic: "Likes raw mince",
      },
      {
        name: "Sage",
        subtitle: "",
        tags: [
          "herb",
          "leaf",
        ],
        desc: "Unlike some herbs which can cause digestive upset in large doses, sage is recognized by the ASPCA as being non-toxic for dogs. You should still limit your dog's intake to a few leaves a day, but there's no danger of poisoning.",
      },
      {
        name: "Salt",
        subtitle: "",
        tags: [
          "salty",
        ],
        desc: "Salt. It's not a good idea to share salty foods like chips or pretzels with your dog. Eating too much salt can make your dog seriously thirsty. That means a lot of trips to the fire hydrant and it could lead to sodium ion poisoning.",
      },
      {
        name: "Salty meats",
        subtitle: "Ham, Salami, ect",
        tags: [
          "",
        ],
        desc: "Eating too much salt can make your dog seriously thirsty. That means a lot of trips to the fire hydrant and it could lead to sodium ion poisoning. Symptoms of too much salt include vomiting, diarrhea, depression, tremors, high temperature, and seizures. It may even cause death.",
        critic: "Loves salty meats obviously",
      },
      {
        name: "Sausage",
        subtitle: "",
        tags: [
          "meat",
        ],
        desc: "Pork sausage is not a recommended source of protein for your dog given it's high in fat and salt, and it may be processed with seasonings that are unsafe for your dog. ... In addition, sausage that contains onion or garlic powder is not safe for your dog. Dogs that eat onion or garlic in any form are at risk for anemia.",
        critic: "Loves sausage obviously",
      },
      {
        name: "Spinach",
        subtitle: "",
        tags: [
          "vege",
          "leaf",
        ],
        desc: "Yes, dogs can eat spinach, but it's not one of the top vegetables you'll want to be sharing with you pup. Spinach is high in oxalic acid, which blocks the body's ability to absorb calcium and can lead to kidney damage",
      },
      {
        name: "Tomato",
        subtitle: "",
        tags: [
          "fruit",
          "vege",
        ],
        desc: "Solanine, a substance found in the stem and leaves of the tomato and related plants, is harmful to dogs in large quantities. ... The leaves, stems, and young, green tomatoes contain higher amounts of solanine than ripe fruit, which means that ripe tomatoes are generally safe to feed to dogs.",
      },
      {
        name: "Walnuts",
        subtitle: "",
        tags: [
          "nut",
          "wallnut",
        ],
        desc: "English walnuts are generally safe for dogs to eat, outside of the considerations mentioned above. But black walnuts (a type of walnut not commonly eaten by people) are toxic for dogs. The symptoms of toxicity are vomiting, muscle weakness and tremors, a high temperature, and seizures.",
      },
    ],
  },
  {
    name: "CANNOT EAT!",
    can: 2,
    items: [
      {
        name: "Almonds",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "But, can dogs eat almonds? The answer is no. While they aren't as toxic as some nuts, it's one of those foods canine companions can't digest as easily as people.",
      },
      {
        name: "Alcohol & medication",
        subtitle: "Obviously.",
        tags: [
          "meds",
        ],
        desc: "Just like chocolate and onions, alcohol is toxic to dogs. Even small amounts of alcohol - not only in drinks but also in syrups and raw bread dough - can have ingredients that are poisonous for them.",
      },
      {
        name: "Avocado",
        subtitle: "",
        tags: [
          "vege",
        ],
        desc: "Avocado contains a toxin called persin, which is considered poisonous for dogs and other animals.",
      },
      {
        name: "Butter",
        subtitle: "",
        tags: [
          "margarine",
          "dairy",
        ],
        desc: "Dogs will enjoy eating lentils in small or moderate amounts after they've been soaked and cooked without spices. Dogs can eat lentils: Mixed with a meat protein and vegetable for a homemade meal. Blended and incorporated into a smaller portion of your dog's store-bought food.",
      },
      {
        name: "Cherry pips, stems, leaves",
        subtitle: "Flesh is ok",
        tags: [
          "berry",
          "berries",
          "fruit",
        ],
        desc: "The cherry pit, stem and leaves all contain cyanide. This is toxic to dogs if ingested in large enough quantities. A single cherry pit and stem often isn't enough to cause cyanide poisoning, but there's no reason to take the risk.",
      },
      {
        name: "Chewing gum",
        subtitle: "",
        tags: [
          "gum",
          "bubble",
        ],
        desc: "Xylitol is a common sugar substitute found in sugar-free chewing gum, toothpaste, mouthwash and some brands of peanut butter. Even in small amounts it can cause hypoglycaemia and liver failure in dogs. ... They say just one stick of chewing gum can contain enough of the sugar substitute to be fatal to dogs.",
      },
      {
        name: "Chicken bones / cooked bones",
        subtitle: "Can splinter",
        tags: [
          "poulty",
          "meat",
        ],
        desc: "Cooked chicken bones can break and splinter, which can cause your dog to choke and can also puncture the gastrointestinal tract, or get caught in his throat. This is extremely painful to your dog and can potentially lead to death.",
      },
      {
        name: "Chocolate",
        subtitle: "",
        tags: [
          "",
        ],
        desc: "Chocolate is poisonous to dogs mostly because of its theobromine content, which dogs are unable to metabolize effectively. If your dog eats chocolate, you should monitor them closely and seek veterinary attention if they show any symptoms, or if they are very young, pregnant or have other health concerns.",
      },
      {
        name: "Cinnamon",
        subtitle: "",
        tags: [
          "spice",
        ],
        desc: "The good news is that cinnamon is not toxic to dogs. ... Chewing on cinnamon sticks and consuming ground cinnamon or essential oil can cause irritation in your dog's mouth, and inhaling cinnamon powder can cause your dog to cough, choke, and have difficulty breathing.",
      },
      {
        name: "Citrus fruit",
        subtitle: "",
        tags: [
          "orange",
          "lemon",
          "lime",
          "fruit",
          "juice",
        ],
        desc: "Oranges, tangerines, and clementines are not toxic to dogs. However, they are high in sugars and can potentially cause GI upset if your pet eats too many of them. The citric acid in these fruits is not a concern to dogs. It can be a problem in some cats.",
      },
      {
        name: "Coconut products",
        subtitle: "Water, Milk",
        tags: [
          "fruit",
        ],
        desc: "Small amounts of coconut and coconut-based products should not cause serious harm to pets. However, the flesh and milk of fresh coconuts contain oils, which can cause diarrhoea, loose stools and stomach upsets. Because the high level of potassium in coconut water, pets should not consume this either.",
      },
      {
        name: "Coffee / tea",
        subtitle: "",
        tags: [
          "caffeine",
        ],
        desc: "Pets are more sensitive to the effects of caffeine than people are. While 1-2 laps of coffee, tea or soda will not contain enough caffeine to cause poisoning in most pets, the ingestion of moderate amounts of coffee grounds, tea bags or 1-2 diet pills can easily cause death in small dogs or cats.",
      },
      {
        name: "Corn cobs",
        subtitle: "",
        tags: [
          "vege",
        ],
        desc: "No matter how lovingly your dog looks at you while you're enjoying a piece of corn on the cob, do not share it with him. There is a risk that he will choke on it, and if he ingests the cob it can cause a serious intestinal blockage. It is not a food you should have your dog gnawing on.",
      },
      {
        name: "Falafel",
        subtitle: "",
        tags: [
          "chickpea",
        ],
        desc: "Falafel contains a lot of garlic, which is toxic to dogs. ... Not only can a large dose of garlic give your dog an upset stomach, which may result in vomiting or diarrhea, it can also damage their red blood cells, and cause anemia.",
      },
      {
        name: "Fatty meats",
        subtitle: "Offcuts",
        tags: [
          "",
        ],
        desc: "Both are dangerous for dogs. Fat trimmed from meat, both cooked and uncooked, may cause pancreatitis in dogs. And, although it seems natural to give a dog a bone, a dog can choke on it. Bones can also splinter and cause an obstruction or lacerations of your dog's digestive system.",
      },
      {
        name: "Grapes, raisins, currants",
        subtitle: "",
        tags: [
          "berry",
          "berries",
          "fruit",
        ],
        desc: "Grapes and raisins are toxic to dogs and can lead to acute kidney failure or even death. ... It's not clear exactly which substance or chemicals in grapes causes poisoning in dogs, but even a very small number of grapes, raisins, sultanas or currants can cause severe problems for some.",
      },
      {
        name: "Ice cream",
        subtitle: "",
        tags: [
          "dairy",
          "dessert",
        ],
        desc: "Eating ice cream may cause your dog a stomach ache or worse, depending on how sensitive they are. Ice cream can cause your dog gas, bloating, constipation, diarrhea or vomiting.",
      },
      {
        name: "Liquorice",
        subtitle: "",
        tags: [
          "aniseed",
        ],
        desc: "Dogs should not eat liquorice there are no health benefits for dogs to eat liquorice, it is toxic to dogs and therefore must be avoided. Not only is it poisonous, but liquorice can also cause tooth decay, diabetes, and obesity in dogs.",
      },
      {
        name: "Macadamia nuts",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "Your pup would only need to eat a small amount of food containing these nuts to experience negative results. ... Dogs who eat macadamia nuts most commonly experience weakness in the back legs, vomiting and diarrhea.",
      },
      {
        name: "Mouldy food / compost",
        subtitle: "",
        tags: [
          "off",
          "spoil",
        ],
        desc: "While mold on dog food should certainly be avoided, the real danger occurs when pets get into household trash or eat garbage outside, including compost piles and moldy nuts or fruits that have fallen from trees. Fungal neurotoxins on old food can make your four-legged friend very ill.",
      },
      {
        name: "Nutmeg",
        subtitle: "",
        tags: [
          "spice",
        ],
        desc: "No, dogs should not eat nutmeg because it is toxic to dogs. Though the amount of nutmeg baked into a pastry is typically not enough to cause serious implications, this spice is toxic to dogs in large quantities.",
      },
      {
        name: "Onion, garlic, chives",
        subtitle: "",
        tags: [
          "shallot",
          "vege",
        ],
        desc: "All parts of the onion plant are toxic to dogs, including the flesh, leaves, juice, and processed powders. Raw or cooked, fried or powdered, onions and the rest of the allium family (garlic, shallots, leeks, and chives) are harmful to dogs.",
      },
      {
        name: "Peach, plum, persimmon",
        subtitle: "",
        tags: [
          "fruit",
        ],
        desc: "Seeds from persimmons can cause problems in a dog's small intestine. ... Peach and plum pits also have cyanide, which is poisonous to people and dogs. People know not to eat them. Dogs don't.",
      },
      {
        name: "Pistachio nuts",
        subtitle: "",
        tags: [
          "nut",
        ],
        desc: "Although pistachios are not directly toxic to dogs they are not recommended. The canine system is not designed to process nuts and they ultimately cause gastrointestinal distress, obesity, and pancreatitis.",
      },
      {
        name: "Prawns",
        subtitle: "Uncooked / Raw",
        tags: [
          "prawn",
          "shrimp",
          "seafood",
        ],
        desc: "No, dogs should not eat raw prawns. It is advised against feeding your dog raw seafood and shellfish because they could potentially carry parasites. Prawns are no exception, and raw prawns may carry harmful pathogens or parasites that could make you or your pet ill.",
      },
      {
        name: "Pumpkin skin, stem",
        subtitle: "",
        tags: [
          "vege",
        ],
        desc: "Dogs can eat pumpkin, but not all in all forms. For example, it's best to avoid raw pumpkin, pumpkin skin and the stem, as they're hard for your pup to digest. Canned and roasted pumpkin, however, are fine as long as there aren't added ingredients or spices",
      },
      {
        name: "Raw egg",
        subtitle: "",
        tags: [
          "poultry",
          "chicken",
        ],
        desc: "Dogs should never eat raw or undercooked eggs. Raw eggs aren't safe at all. 'They can be a source of Salmonella. ... Some foods can lose nutrients while they are cooked, but the protein in eggs isn't.",
      },
      {
        name: "Raw bread dough",
        subtitle: "",
        tags: [
          "yeast",
          "unbake",
        ],
        desc: "Raw bread dough that contains yeast can lead to serious and even fatal poisoning in dogs. The lump of unbaked bread dough will expand in the dog&rsquo;s stomach causing severe abdominal distention. As the yeast cells ferment, blood ethanol can rise to toxic levels.",
      },
      {
        name: "Soft drink",
        subtitle: "",
        tags: [
          "soda",
          "pop",
        ],
        desc: "It's best to keep your tea away from your pup. Soda: Again, it's the caffeine in soda that can be dangerous to pets. If your dog happens to lick up a few spilled drops of your cola off the floor, it's likely no reason to panic. But definitely don't fill up his bowl with your favorite soda, thinking he needs a treat.",
      },
      {
        name: "Tea tree oil",
        subtitle: "",
        tags: [
          "",
        ],
        desc: "Tea tree oil is often found in varying concentrations and high concentrations should never be used on pets. As little as 7 drops of 100% oil has resulted in severe poisoning, and applications of 10-20 mls of 100% oil have resulted in poisoning and death in both dogs and cats.",
      },
      {
        name: "Vegemite",
        subtitle: "",
        tags: [
          "promite",
          "marmite",
        ],
        desc: "Nope, your dog can't eat Vegemite, Marmite or any of its different presentations. While Vegemite isn't toxic, it has way too much sodium. If a dog were to eat a whole tub of Vegemite, they might get sodium ion poisoning, which is life-threatening",
      },
      {
        name: "Xylitol",
        subtitle: "Sugar Substitute",
        tags: [
          "sugar",
          "substitute",
          "sweet",
        ],
        desc: "This occurs because xylitol may not be completely digested in the intestines until the digestive system adapts. Xylitol is extremely toxic to dogs. Even small amounts of xylitol can cause hypoglycemia (low blood sugar), seizures, liver failure or even death in dogs.",
      },
    ],
  },
];