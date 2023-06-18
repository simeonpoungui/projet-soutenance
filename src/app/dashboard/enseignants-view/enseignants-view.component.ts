import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InscriptionService } from '../../services/inscription.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { EnseignantComponent } from 'src/app/forms/enseignant/enseignant.component';
import { Enseignant } from 'src/app/models/enseignant.model';
declare var $: any;
@Component({
  selector: 'app-enseignants-view',
  templateUrl: './enseignants-view.component.html',
  styleUrls: ['./enseignants-view.component.scss']
})
export class EnseignantsViewComponent {

  dataSource!: any;
  displayedColumns = [

    'nom_enseignant',
    'prenom_enseignant',
    // 'adresse',
    'telephone',
    // 'civilite',
    // 'nationalite',
    'matieres_enseigne',
    'etablissement',
    'Actions'
  ];

  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private EnseignantService : EnseignantService
  ) { }


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
    
     this.initEnseignant()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initEnseignant() {this.isLoading=true;
    this.EnseignantService.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(data.message);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  create() {
    const refview = this.dialog.open(EnseignantComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(Enseignant: Enseignant) {
    const ref = this.dialog.open(EnseignantComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = Enseignant.id;
  }


  view(Enseignant: Enseignant) {
    const refview = this.dialog.open(EnseignantComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = Enseignant.id;
  }

  delete(Enseignant:Enseignant) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer l\'enseignant ' + Enseignant.nom_enseignant + ' ?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.EnseignantService.delete(Enseignant.id).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
         location.reload()
        });
      }
    });
    console.log(Enseignant);
  }

  imprimer() {
    const url = 'http://localhost:8000/impression/liste/enseignant';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }
 
}
