
const deployAccess = async props => {
    
    let ethers = props.ethers;
    let ACC = await ethers.getContractFactory("LibAccess");
    if(!ACC) {
        throw new Error("Could not find LibAccess");
    }
    console.log("Deploying access library...");
    let accLib = await ACC.deploy();
    let libR = await accLib.deployTransaction.wait();
    if(!props.deployCosts) {
        props.deployCosts = [];
    }
    props.deployCosts.push(libR.gasUsed);
    console.log("Deployed access library at", accLib.address);
    console.log("Access Library cost", libR.gasUsed.toString());
    props.accLib = accLib;
    return props;
    
}

const deployMerkle = async props => {
    
    let ethers = props.ethers;
    console.log("Deploying merkle library...");
    const MERK = await ethers.getContractFactory("LibMerkle");
    let libMerk = await MERK.deploy();
    libR = await libMerk.deployTransaction.wait();
    props.deployCosts.push(libR.gasUsed);
    console.log("Deployoed merkle lib at", libMerk.address);
    console.log("Merkle library cost", libR.gasUsed.toString());
    props.libMerkle = libMerk;
    return props;
    
}

const setupL2Bucket = async props => {
    
    return deployAccess(props)
          .then(deployMerkle)
          .then(deployBucket);
          
          return props;
}

const deployBucket = async props => {
   
    const Con = await ethers.getContractFactory("L2Bucket", {
        libraries: {
            LibAccess: props.accLib.address,
            LibMerkle: props.libMerkle.address
        }
    });
    console.log("Deploying L2Bucket impl...");
    
    let impl = await Con.deploy();
    let r = await impl.deployTransaction.wait();
    console.log("Merkle impl gas used", r.gasUsed.toString());
    props.deployCosts.push(r.gasUsed);


    console.log("Deployed merkle impl at", impl.address);
    
    props.l2Bucket = new ethers.Contract(impl.address, impl.interface, props.owner);
    
    return props;
}


module.exports = {
    deployAccess,
    deployMerkle,
    deployBucket,
    setupL2Bucket
}