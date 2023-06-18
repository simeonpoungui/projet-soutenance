import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
declare var $: any;

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {


  id!:string 
  nom_agent!:string 
  prenom_agent!:string 
  telephone!:string 
  email!:string 
  adresse!:string 
  nationalite!:string 
  role!:string 
  civilite!:string
  pays!:string

  @Input() action !: "create" | "edit" | "view"

  dataSource: any;
  isLoading!: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public _location : Location,
   private AgentService: AgentService

  ) {}

  ngOnInit(): void {

    $(document).ready(function () {

      var windows = $(window);
      var stick = $(".header-sticky");
    windows.on('scroll',function() {    
      var scroll = windows.scrollTop();
      if (scroll < 5) {
        stick.removeClass("sticky");
      }else{
        stick.addClass("sticky");
      }
    });  
  /*------------------------------------
    jQuery MeanMenu 
  --------------------------------------*/
    $('.main-menu nav').meanmenu({
      meanScreenWidth: "767",
      meanMenuContainer: '.mobile-menu'
    });
      
      
      /* last  2 li child add class */
      $('ul.menu>li').slice(-2).addClass('last-elements');
  /*------------------------------------
    Owl Carousel
  --------------------------------------*/
      $('.slider-owl').owlCarousel({
          loop:true,
          nav:true,
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          smartSpeed: 2500,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:1
              },
              1000:{
                  items:1
              }
          }
      });
  
      $('.partner-owl').owlCarousel({
          loop:true,
          nav:true,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:3
              },
              1000:{
                  items:5
              }
          }
      });  
  
      $('.testimonial-owl').owlCarousel({
          loop:true,
          nav:true,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:1
              },
              1000:{
                  items:1
              }
          }
      });
  /*------------------------------------
    Video Player
  --------------------------------------*/
      $('.video-popup').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          zoom: {
              enabled: true,
          }
      });
      
      $('.image-popup').magnificPopup({
          type: 'image',
          gallery:{
              enabled:true
          }
      }); 
  /*----------------------------
      Wow js active
  ------------------------------ */

  /*------------------------------------
    Scrollup
  --------------------------------------*/
      $.scrollUp({
          scrollText: '<i class="fa fa-angle-up"></i>',
          easingType: 'linear',
          scrollSpeed: 900,
          animation: 'fade'
      });
  /*------------------------------------
    Nicescroll
  --------------------------------------*/
      // $(".notice-left").niceScroll({
      //     cursorcolor: "#EC1C23",
      //     cursorborder: "0px solid #fff",
      //     autohidemode: false,
      // });
  
      /*-----------------------
          Search Toggle
      ------------------------- */
      let searchSelector = document.querySelector('.search-toggle');
      const searchBox = document.querySelector('.search');
      
      if (searchSelector && searchBox) {
        searchSelector.addEventListener('click', function () {
          searchBox.classList.toggle('open');
        });
      }
    });
    

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(agentID: string) {
    this.AgentService.geById(agentID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.nom_agent =  (data as any).message.nom_agent
      this.prenom_agent =  (data as any).message.prenom_agent
      this.telephone =  (data as any).message.telephone
      this.email =  (data as any).message.email 
      this.adresse =  (data as any).message.adresse 
      this.nationalite =  (data as any).message.nationalite 
      this.role =  (data as any).message.role 
      this.civilite =  (data as any).message.civilite
      this.pays =  (data as any).message.pays      
    
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const agent: Agent = form.value;

    agent.id = this.id


    if(this.action === 'edit') {
       this.AgentService.upddate(agent).pipe(catchError((error:HttpErrorResponse)=>{
         console.log(error.status);
         this.isLoading = false
         location.reload()
         return []
       })).subscribe(
         (data) => {

           console.log(data);
         
         },
         (Error) => console.log(Error)
       );
    } else {
      
      this.AgentService.add(agent).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        this.isLoading = false
        location.reload()
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          
        },
        (error) => console.log(error)
      );
    }
  }


}
