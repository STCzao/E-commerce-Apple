const Hero = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-hero.png)] bg-cover bg-center text-white flex items-center justify-center">
        <div className="flex flex-col items-center text-white/90 ">
          <span className="text-5xl font-semibold mb-15">
            La mejor manera de comprar los productos que amas.
          </span>
          <span className="text-xl">
            Sumérgete en el mundo Apple
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
