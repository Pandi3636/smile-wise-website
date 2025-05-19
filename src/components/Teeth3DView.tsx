import React from "react";

const teethModels = [
  {
    title: "Maxillary First Molar",
    embedUrl: "https://sketchfab.com/models/9117c7a9bf0848f29bc4e85931697e7b/embed",
    description: "3D view of Maxillary First Molar with Cusp of Carabelli"
  },
  {
    title: "Mandibular First Molar",
    embedUrl: "https://sketchfab.com/models/9117c7a9bf0848f29bc4e85931697e7b/embed",
    description: "3D view of Mandibular First Molar"
  },
  {
    title: "Maxillary Central Incisor",
    embedUrl: "https://sketchfab.com/models/9117c7a9bf0848f29bc4e85931697e7b/embed",
    description: "3D view of Maxillary Central Incisor"
  },
  {
    title: "Mandibular Canine",
    embedUrl: "https://sketchfab.com/models/9117c7a9bf0848f29bc4e85931697e7b/embed",
    description: "3D view of Mandibular Canine"
  }
];

const Teeth3DView = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-dark-blue mb-4">
            3D Teeth Visualization
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our interactive 3D models to better understand dental anatomy and treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teethModels.map((model, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title={model.title}
                  src={model.embedUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  className="w-full h-[300px]"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dental-dark-blue mb-2">
                  {model.title}
                </h3>
                <p className="text-gray-600">{model.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teeth3DView;
