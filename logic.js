$(function(){
    insertUX();
    insertOptions();
    $("#navbar-option-mobile > button").on("click",toggleMobileOptions)
    $("#btnSeeContact").on("click",scrollToContact);
    
})
function toggleMobileOptions(){
    $("#options-mobile").toggle();
    $(this).toggleClass("mobile-button-active");
}
class Option{
    constructor(obj){
        this.title=obj.title;
        this.section = obj.section;
    }
    build(){
        const optionContainer=$("#grid-header-options");
        const other =$("#navbar-options");
        const mobile =$("#options-mobile");
        optionContainer
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
        other
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
        mobile
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
    
    }
}
function makeScrollToSection(section){
    
    
    return function(){
        $("#options-mobile").hide();
        $([document.documentElement, document.body])
        .animate({scrollTop:
            $(section).offset().top-56},1000)
    };

}
const scrollToContact=makeScrollToSection("#grid-general-contact");

class SectionGeneral{
    constructor(obj){
        this.id = obj.id;
        this.title = obj.title;
        this.directory = obj.directory;
        this.images = obj.images;
        this.year = obj.year;
        this.description = obj.description;
        this.selectors = [];
    }
    buildServices(){
        this.build("#grid-general-services");
    }
    buildReferences(){
        this.build("#grid-general-references");
    }
    build(parent){
        const buttonShower = $("<div>",{class:"button-shower"});
        const imageShower = $("<div>",{class:"image-shower"});
        $(parent)
        .append($("<div>",{class:"section-shower"})
            .append(imageShower)
            .append($("<div>",{class:"description-shower"})
                .append($("<div>",{class:"title-shower",html:this.title})
                    .append($("<div>",{class:"year-shower",html:this.year})))
            .append($("<p>",{html:this.description}))
            .append(buttonShower)));
        //buttonShower.append($("<button>",{html:"Preview"}));
        this.images = this.images.map(x => $("<img>",{src:"images/"+this.directory+"/"+x}));
        this.images
        .forEach(x => imageShower.append(x));
        if(this.images.length > 1)
            this.insertImageSelector(imageShower);
    }
    insertImageSelector(imageContainer){
        const imageSelector=$("<div>",{class:"image-selector"});
        imageContainer.append(imageSelector);
        this.selectors = this.images
                        .map((x,y) => $("<i>",{class:"fa fa-circle",
                            click:()=>this.showImageInSelector(x,y)}))
        this.selectors
        .forEach(x => imageSelector.append(x));
        this.showImageInSelector(this.images[0],0);
    }
    showImageInSelector(x,y){
        this.images.forEach(z => z.hide());
        this.selectors.forEach((z,index) => {
            z.removeClass("fa-circle");
            z.removeClass("fa-circle-o");
            if(index === y){
                z.addClass("fa-circle");
            }else{
                z.addClass("fa-circle-o");
            }
        });
        x.fadeIn(1000);

    }
}
function insertOptions(){
    const listOptions=[
        {title:"Home",section:"#grid-general-start"},
        {title:"Services",section:"#grid-general-services"},
        {title:"Contact",section:"#grid-general-contact"},
    ]
    listOptions
    .map(z => new Option(z))
    .forEach(z => z.build());
}
function insertUX(){
    const listServices = [
        {title:"Depression",
        description:"Since depression affects people differently, it can be challenging to navigate without understanding treatment options and how to move forward with your life. Now is the time to get answers about what steps are necessary to manage your depression.", 
        directory:"services",
            images:["depression.jpg"]},
        {title:"Anxiety",
        description:"Worrying is a part of life, but it doesn’t mean you have a disorder. Sometimes anxiety gets overwhelming, and you need to know how to control it. I will teach you how!", 
        directory:"services",
            images:["anxiety.jpg"]},
        {title:"Stress",
        description:"There are difficult life situations that we all have to go through which can lead us to feel stressed. But if you don’t learn how to identify and address the stress that you experience in life, it can have a negative impact on you in the short-term and long-term. This is why it’s important to learn stress management strategies to help you stay healthy.", 
        directory:"services",
            images:["stress.jpg"]},
        {title:"Self Esteem",
        description:"Everyone deserves to recognize their full worth as a person. Unfortunately, many people tend to dwell on their flaws and failures. At the same time, they often de-emphasize their good points, which can lead to low self-esteem. After 4 sessions we can reverse this trend and help you gain an accurate perspective.", 
        directory:"services",
            images:["self-esteem.jpg"]},
        {title:"Grief",
        description:"Grief is a normal response to the loss of something or someone you deeply loved and cared about. Although many people associate grief with being just an emotional reaction to loss, grief can also impact an individual socially, physically, culturally, as well as the way they behave. I'm not going to pretend I know exactly how you feel, but I will help you manage your grief.", 
        directory:"services",
            images:["grief.jpg"]},
        {title:"Relationships",
        description:"Everybody has an opinion, including one on your love life. Unfortunately, all of the advice you get is not equally valid. If your relationship is in trouble, or if you wish to further strengthen one that's still going strong, you will find the perspective a professional counselor is invaluable.", 
        directory:"services",
            images:["relationships.jpg"]},
        {title:"Anger",
        description:"Everybody gets angry from time to time, but letting your emotions control you is largely a matter of choice. Anger management techniques can be adopted by anyone in order to live a happier, better regulated life.", 
        directory:"services",
            images:["anger.jpg"]},
            
    ];  
    
    const listReferences = [
        {title:"Jane Smith",
        description:"Helped me reconect with my partner and understand what I need to do "+
        " to keep a better relationship.", 
        directory:"references",
            images:["reference1.jpg"]},
        {title:"John Smith",
        description:"I wasn't sure if I had a problem, but I wasn't feeling all good either. These therapy sessions really clear your mind."+
        "", 
        directory:"references",
            images:["reference2.jpg"]},
        {title:"Juan 'Maluma' Londoño",
        description:"Sometimes when I get no inspiration for my songs, I remember what we practiced on the sessions and my imagination goes 'Wow!'"+
        "", 
        directory:"references",
            images:["reference3.jpg"]},
        {title:"Natalia 'Natti Natasha' Alexandra",
        description:"I consider her not only my therapist but someone that has helped me understand how I feel and how others feel because of me. Someone I am happy to call 'amiga' "+
        "", 
        directory:"references",
            images:["reference4.jpg"]},

            
            
    ];  
    listServices
    .map(z => new SectionGeneral(z))
    .forEach(y => {y.title="Help with "+y.title;y.buildServices()});
    listReferences
    .map(z => new SectionGeneral(z).buildReferences())
}