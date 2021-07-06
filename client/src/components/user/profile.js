import React from 'react';
import axios from 'axios';
import Logo from '../../image/logo.png';
import NavBack from '../navBack';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import Sidenav from '../sidenav';
import NavBackDash from '../navbackdash';
class Profile extends React.Component {
	state = {
		posts: []
	}

	componentDidMount = () => {
		this.getProfile()
	}

	getProfile =async() => {
	await axios.get('/api/profile/get')
			.then((response) => {
				const data = response.data.profile;
				this.setState({ posts: data });
				console.log('Data has been received')
			})
			.catch(err => {
				console.log(err)
				console.log('error in receiving data')
			})
	}
	showProfile = (post) => {
		if (!post.length) return (
			<>
		<h2 style={{ textAlign: 'center',margin:'40px' }}>Please create profile</h2>
		<a href='/profile' style={{textAlign:'center',textDecoration:'none', fontFamily:'Raleway-bold',margin:"40px"}}>Create Profile</a>
		</>)
		return post.map((p, index) => (
			<>
				<div class="col-sm-4 bg-info rounded-left" key={index}>
					<div class="card-block text-center text-white">
						<i class="fas fa-user-tie fa-7x mt-5"></i>
						<h2 class="font-weight-bold mt-4 text-uppercase">{p.name}</h2>
						<p>CEO of {p.companyName}</p><i class="far fa-edit fa-2x mb-4"></i>
					</div>
				</div>
				<div class="col-sm-8 bg-white rounded-right" key={index}>
					<h3 class="mt-3 text-center">Information</h3>
					<hr class="bg-primary mt-0 w-25" />
					<div class="row">
						<div class="col-sm-6">
							<p class="font-weight-bold">Email:</p>
							<h6 class=" text-muted"> {p.email} </h6>
						</div>
						<div class="col-sm-6">
							<p class="font-weight-bold">Phone:</p>
							<h6 class="text-muted"> {p.phone} </h6>
						</div>
					</div>
					<h4 class="mt-3">Get In touch </h4>
					<hr class="bg-primary" />
					<div class="row">
						<div class="col-sm-6">
							<p class="font-weight-bold">Company Address</p>
							<h6 class="text-muted"> {p.address} </h6>
						</div>
						<div class="col-sm-6">
							<p class="font-weight-bold"> Company Name </p>
							<h6 class="text-muted"> {p.companyName} </h6>
						</div>
					</div>
					<hr class="bg-primary" />
					<h5 class='mt-3'>Want to <a href="/updateprofile">Update</a>  Your Porfile?</h5>
				</div>
			</>
		))
	}
	render() {
		return (
			<div class="main-wrapper">
				<NavBackDash />
				<div class="site-content-wrapper">
					<Topbar />
					<NavTrigger />
					<div class="site-content">
						<div class='sidenav'>
							<Sidenav />
							<div className='page-content p-2' id='content'>
								<div style={{ textAlign: 'center' }}>
									<a href='/' class="branding">
										<img src={Logo} alt="" />
									</a>
								</div>
								<div class="container">
									<div class="row d-flex justify-content-center">
										<div class="col-md-10 mt-5 pt-5">
											<div class="row z-depth-3">
												{this.showProfile(this.state.posts)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile
