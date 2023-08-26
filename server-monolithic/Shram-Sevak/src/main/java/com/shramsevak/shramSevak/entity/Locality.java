package com.shramsevak.shramSevak.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "localities")
@Getter
@Setter
public class Locality extends BaseEntity{
	
	@Column(name = "pincode")
    private Long pincode;
    
	@Column(name = "locality")
    private String locality;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    // RELATIONS
    @OneToMany(mappedBy = "locality", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();
    
    @OneToMany(mappedBy = "locality", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Worker> workers = new ArrayList<>();
    
    
    // HELPER METHODS
    
    // Address Helper
    public void addAddress(Address address) {
		addresses.add(address);
		address.setLocality(this);
	}
	
	public void removeAddress(Address address) {
		addresses.remove(address);
		address.setLocality(this);
	}
    
	// Worker Helper
	public void addWorker(Worker worker) {
		workers.add(worker);
		worker.setLocality(this);
	}
	
	public void removeWorker(Worker worker) {
		workers.remove(worker);
		worker.setLocality(null);
	}
}




